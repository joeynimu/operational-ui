/// <reference types="react" />
import { GlamorousComponent } from "glamorous";
import { Theme } from "contiamo-ui-theme";
export interface IProps {
    id?: string | number;
    style?: {};
    className?: string;
    children: Node;
    onClick?: any;
    theme?: Theme;
}
declare const style: ({theme, color}: {
    theme: Theme;
    color?: string;
}) => {};
declare const SideNavigationLink: (props: IProps) => JSX.Element;
declare const _default: GlamorousComponent<IProps & object & Pick<{
    theme: Theme;
    color?: string;
}, "color">, {
    theme: Theme;
    color?: string;
}>;
export default _default;
export { SideNavigationLink, style };