The `Breadcrumb` component is nested inside the `<Breadcrumbs/>` to provide breadcrumb navigation. Note that in-between slashes are interspersed automatically.

### Usage

Using a `to` prop navigates automatically, and render proper anchor tags with hrefs. See `OperationalUI` docs for a one-time configuration you need to do to have pushstate navigation working out-of-the-box.

```jsx
import * as React from "react"
import { Breadcrumb } from "@operational/components"
;<Breadcrumb to="/#/Components/Breadcrumbs">Breadcrumbs</Breadcrumb>
```

### Usage with icons

```jsx
import * as React from "react"
import { HomeIcon, Breadcrumb } from "@operational/components"
;<Breadcrumb to="/#" icon={HomeIcon}>
  Home
</Breadcrumb>
```
