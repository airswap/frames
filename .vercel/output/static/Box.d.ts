import type { JSX } from 'hono/jsx/jsx-runtime';
import type { Child, Direction, SatoriStyleProperties, ValueOf } from './types.js';
import { type DefaultVars, type Vars } from './vars.js';
export type VariableValue<property extends keyof SatoriStyleProperties, token> = token | {
    custom: SatoriStyleProperties[property];
};
type WithNegatedValues<obj extends object | undefined> = ValueOf<{
    [key in keyof obj]: key extends `${number}` ? `-${key}` | key : key;
}>;
export type BoxProps<vars extends Vars = DefaultVars> = Omit<SatoriStyleProperties, 'background' | 'backgroundColor' | 'borderColor' | 'borderBottomColor' | 'borderBottomLeftRadius' | 'borderBottomRightRadius' | 'borderBottomWidth' | 'borderLeftColor' | 'borderLeftWidth' | 'borderRadius' | 'borderRightColor' | 'borderRightWidth' | 'borderTopColor' | 'borderTopLeftRadius' | 'borderTopRightRadius' | 'borderTopWidth' | 'borderWidth' | 'bottom' | 'color' | 'fontFamily' | 'fontSize' | 'height' | 'gap' | 'left' | 'letterSpacing' | 'lineHeight' | 'margin' | 'marginTop' | 'marginBottom' | 'marginLeft' | 'marginRight' | 'maxHeight' | 'minHeight' | 'maxWidth' | 'minWidth' | 'padding' | 'paddingTop' | 'paddingBottom' | 'paddingLeft' | 'paddingRight' | 'paddingRight' | 'right' | 'top' | 'width'> & {
    __context?: {
        direction?: Direction | undefined;
        vars?: Vars | undefined;
    } | undefined;
    alignHorizontal?: 'left' | 'center' | 'right' | 'space-between';
    alignVertical?: 'top' | 'center' | 'bottom' | 'space-between';
    background?: VariableValue<'backgroundColor', keyof vars['colors']>;
    backgroundColor?: VariableValue<'backgroundColor', keyof vars['colors']>;
    borderColor?: VariableValue<'borderColor', keyof vars['colors']>;
    borderBottomColor?: VariableValue<'borderBottomColor', keyof vars['colors']>;
    borderBottomLeftRadius?: VariableValue<'borderBottomLeftRadius', keyof vars['units']>;
    borderBottomRightRadius?: VariableValue<'borderBottomRightRadius', keyof vars['units']>;
    borderBottomWidth?: VariableValue<'borderBottomWidth', keyof vars['units']>;
    borderLeftColor?: VariableValue<'borderLeftColor', keyof vars['colors']>;
    borderLeftWidth?: VariableValue<'borderLeftWidth', keyof vars['units']>;
    borderRadius?: VariableValue<'borderRadius', keyof vars['units']>;
    borderRightColor?: VariableValue<'borderRightColor', keyof vars['colors']>;
    borderRightWidth?: VariableValue<'borderRightWidth', keyof vars['units']>;
    borderTopColor?: VariableValue<'borderTopColor', keyof vars['colors']>;
    borderTopLeftRadius?: VariableValue<'borderTopLeftRadius', keyof vars['units']>;
    borderTopRightRadius?: VariableValue<'borderTopRightRadius', keyof vars['units']>;
    borderTopWidth?: VariableValue<'borderTopWidth', keyof vars['units']>;
    borderWidth?: VariableValue<'borderWidth', keyof vars['units']>;
    bottom?: VariableValue<'bottom', keyof vars['units']>;
    children?: JSX.Element | JSX.Element[] | Child | undefined;
    color?: VariableValue<'color', keyof vars['colors']>;
    fontFamily?: VariableValue<'fontFamily', keyof vars['fonts']>;
    fontSize?: VariableValue<'fontSize', keyof vars['fontSizes']>;
    height?: VariableValue<'height', keyof vars['units'] | '100%'>;
    gap?: VariableValue<'gap', keyof vars['units']>;
    grow?: boolean;
    left?: VariableValue<'left', keyof vars['units']>;
    letterSpacing?: VariableValue<'letterSpacing', keyof vars['units'] | WithNegatedValues<vars['units']>>;
    lineHeight?: VariableValue<'lineHeight', keyof vars['units']>;
    margin?: VariableValue<'margin', WithNegatedValues<vars['units']>>;
    marginTop?: VariableValue<'marginTop', WithNegatedValues<vars['units']>>;
    marginBottom?: VariableValue<'marginBottom', WithNegatedValues<vars['units']>>;
    marginLeft?: VariableValue<'marginLeft', WithNegatedValues<vars['units']>>;
    marginRight?: VariableValue<'marginRight', WithNegatedValues<vars['units']>>;
    maxHeight?: VariableValue<'maxHeight', keyof vars['units'] | '100%'>;
    minHeight?: VariableValue<'minHeight', keyof vars['units'] | '100%'>;
    maxWidth?: VariableValue<'maxWidth', keyof vars['units'] | '100%'>;
    minWidth?: VariableValue<'minWidth', keyof vars['units'] | '100%'>;
    padding?: VariableValue<'padding', keyof vars['units']>;
    paddingTop?: VariableValue<'paddingTop', keyof vars['units']>;
    paddingBottom?: VariableValue<'paddingBottom', keyof vars['units']>;
    paddingLeft?: VariableValue<'paddingLeft', keyof vars['units']>;
    paddingRight?: VariableValue<'paddingRight', keyof vars['units']>;
    right?: VariableValue<'right', keyof vars['units']>;
    top?: VariableValue<'top', keyof vars['units']>;
    width?: VariableValue<'width', keyof vars['units'] | '100%'>;
};
export declare function Box<vars extends Vars>({ __context, children, grow, src, ...rest }: BoxProps<vars>): JSX.Element;
export declare function resolveColorToken(colors: Vars['colors'] | undefined, value: VariableValue<keyof SatoriStyleProperties, any> | undefined, fallback?: unknown): string;
export declare function resolveUnitToken(units: Vars['units'] | undefined, value: VariableValue<keyof SatoriStyleProperties, any> | undefined, baseUnit: number, fallback?: unknown): string | undefined;
export {};
//# sourceMappingURL=Box.d.ts.map