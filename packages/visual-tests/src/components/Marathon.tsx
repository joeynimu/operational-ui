import * as React from "react"
import glamorous, { Div } from "glamorous"

import TestResults from "./MarathonTestResults"
import { Theme } from "@operational/theme"

type TestFn = (done?: ((a: any) => void)) => void

export interface State {
  id: number // the id of the test, incrementing every time a new test prop is passed
  tests: Test[]
  completed: number
}

export interface Props {
  css?: any
  className?: string
  timeout?: number
  test: (testEnvironment: MarathonEnvironment) => void
}

// Test globals mimicking Jest's API
export interface MarathonEnvironment {
  test?: (description: string, done?: () => void) => void
  expect?: (expected: any) => { toBe: any }
  beforeEach?: (fn: any) => void
  afterEach?: (fn: any) => void
  beforeAll?: (fn: any) => void
  afterAll?: (fn: any) => void
  container: any
}

interface TestWithRunner {
  description: string
  fn: TestFn
}

export interface Test {
  description: string
  errors: string[]
}

const sleep = (ms: number) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, ms)
  })

const Content = glamorous.div(
  {
    padding: 20
  },
  ({ theme }: { theme: Theme }) => ({
    backgroundColor: theme.colors.gray
  })
)

class Marathon extends React.Component<Props, State> {
  static defaultProps = {
    timeout: 0
  }

  state = {
    tests: [] as Test[],
    completed: 0,
    id: 0
  }

  container: HTMLElement

  private _tests: TestWithRunner[] = []

  setStateById = (updater: (prevState: State, props: Props) => { id: number }, ignoreId?: boolean): Promise<void> => {
    // If the test id's don't match, it means that the setState is called from an uncleared timeout or async action from an old test.
    const tentativeNewState = updater(this.state, this.props)
    return new Promise((resolve, reject) => {
      if (!ignoreId && tentativeNewState.id !== this.state.id) {
        return reject()
      }
      this.setState(updater, () => {
        resolve()
      })
    })
  }

  test = (description: string, fn: (done?: ((a: any) => void)) => void): void => {
    this._tests.push({ description, fn })
  }

  expect = (actual: any): { toBe: any } => {
    return {
      toBe: (expected: any): void => {
        const error = actual === expected ? null : `Expected ${String(actual)} to equal ${String(expected)}`
        this.setStateById(({ id, tests, completed }: State) => ({
          id,
          tests: tests.map((test, index) => (index === completed ? { ...test, errors: [...test.errors, error] } : test))
        }))
      }
    }
  }

  // Test lifecycle callbacks
  beforeEach?: () => void
  afterEach?: () => void
  beforeAll?: () => void
  afterAll?: () => void

  runNext = async () => {
    const { tests, completed } = this.state
    const { timeout } = this.props
    const test = this._tests[completed]

    if (!test) {
      return
    }

    const currentTestId = this.state.id

    if (test.fn.length === 0) {
      await sleep(timeout as any)
      try {
        this.beforeEach && this.beforeEach()
        test.fn()
        this.afterEach && this.afterEach()
      } catch (err) {
        await this.setStateById(prevState => ({
          id: currentTestId,
          tests: prevState.tests.map(
            (test: Test, index: number) =>
              index === prevState.completed ? { ...test, errors: [...test.errors, String(err)] } : test
          )
        }))
      }
      try {
        await this.setStateById((prevState: State) => ({ id: currentTestId, completed: prevState.completed + 1 }))
        this.runNext()
      } catch (err) {}
    } else {
      await sleep(timeout as any)
      this.beforeEach && this.beforeEach()
      test.fn(async () => {
        this.afterEach && this.afterEach()
        try {
          await this.setStateById(prevState => ({ id: currentTestId, completed: prevState.completed + 1 }))
          this.runNext()
        } catch (err) {}
      })
    }
  }

  startTests() {
    this._tests = []

    // Run client-provided test function, injecting test methods (test, expect, ...)
    this.props.test({
      test: this.test,
      expect: this.expect,
      container: this.container,
      beforeEach: (fn: any): void => {
        this.beforeEach = fn
      },
      afterEach: (fn: any): void => {
        this.beforeEach = fn
      },
      beforeAll: (fn: any): void => {
        this.beforeAll = fn
      },
      afterAll: (fn: any): void => {
        this.afterAll = fn
      }
    } as any)

    // Pin the test array on state, run first one when ready.
    this.setStateById((prevState: State) => ({
      id: prevState.id,
      tests: this._tests.map(test => ({ description: test.description, errors: [] }))
    })).then(() => {
      this.beforeAll && this.beforeAll()
      this.runNext()
    })
  }

  componentDidMount() {
    this.startTests()
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (prevProps.test !== this.props.test) {
      this.afterAll && this.afterAll()
      this.beforeEach = undefined
      this.afterEach = undefined
      this.beforeAll = undefined
      this.afterAll = undefined
      this.container.innerHTML = ""
      this.setStateById(
        prevState => ({
          id: prevState.id + 1,
          tests: [],
          completed: 0
          // Set ignoreId flag to true to proceed with the state update even though test ids don't match.
        }),
        true
      ).then(() => {
        this.startTests()
      })
    }
  }

  render() {
    console.log(this.state)
    const { css, className } = this.props
    return (
      <Div css={css} className={className}>
        <TestResults tests={this.state.tests} completed={this.state.completed} />
        <Content
          innerRef={(node: HTMLElement) => {
            this.container = node
          }}
        />
      </Div>
    )
  }
}

export default Marathon
