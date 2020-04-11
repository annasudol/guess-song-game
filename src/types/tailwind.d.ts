interface ResponsiveOption<T> {
    /**
     * `xs` styles are applied to all breakpoints unless their values are
     * explicitly defined
     */
    xs?: T;

    sm?: T;
    md?: T;
    lg?: T;
    xl?: T;
}

type ColorOption =
    | "branded"
    | "transparent"
    | "black"
    | "white"
    | "gray-100"
    | "gray-200"
    | "gray-300"
    | "gray-400"
    | "gray-500"
    | "gray-600"
    | "gray-700"
    | "gray-800"
    | "gray-900"
    | "red-100"
    | "red-200"
    | "red-300"
    | "red-400"
    | "red-500"
    | "red-600"
    | "red-700"
    | "red-800"
    | "red-900"
    | "orange-100"
    | "orange-200"
    | "orange-300"
    | "orange-400"
    | "orange-500"
    | "orange-600"
    | "orange-700"
    | "orange-800"
    | "orange-900"
    | "yellow-100"
    | "yellow-200"
    | "yellow-300"
    | "yellow-400"
    | "yellow-500"
    | "yellow-600"
    | "yellow-700"
    | "yellow-800"
    | "yellow-900"
    | "green-100"
    | "green-200"
    | "green-300"
    | "green-400"
    | "green-500"
    | "green-600"
    | "green-700"
    | "green-800"
    | "green-900"
    | "teal-100"
    | "teal-200"
    | "teal-300"
    | "teal-400"
    | "teal-500"
    | "teal-600"
    | "teal-700"
    | "teal-800"
    | "teal-900"
    | "blue-100"
    | "blue-200"
    | "blue-300"
    | "blue-400"
    | "blue-500"
    | "blue-600"
    | "blue-700"
    | "blue-800"
    | "blue-900"
    | "indigo-100"
    | "indigo-200"
    | "indigo-300"
    | "indigo-400"
    | "indigo-500"
    | "indigo-600"
    | "indigo-700"
    | "indigo-800"
    | "indigo-900"
    | "purple-100"
    | "purple-200"
    | "purple-300"
    | "purple-400"
    | "purple-500"
    | "purple-600"
    | "purple-700"
    | "purple-800"
    | "purple-900"
    | "pink-100"
    | "pink-200"
    | "pink-300"
    | "pink-400"
    | "pink-500"
    | "pink-600"
    | "pink-700"
    | "pink-800"
    | "pink-900"
    | "inherit";
type TypeOption = "span" | "button" | "a" | "h1" | "h2" | "h3" | "h4" | "h5";

type DisplayOption =
    | "block"
    | "inline-block"
    | "inline"
    | "flex"
    | "inline-flex"
    | "table"
    | "table-row"
    | "table-cell"
    | "hidden";

type DisplayOptions = DisplayOption | ResponsiveOption<DisplayOption>;

type SizeOption =
    | "1"
    | "2"
    | "3"
    | "4"
    | "5"
    | "6"
    | "8"
    | "10"
    | "12"
    | "16"
    | "20"
    | "24"
    | "32"
    | "40"
    | "48"
    | "56"
    | "64"
    | "auto"
    | "px"
    | "1/2"
    | "1/3"
    | "2/3"
    | "1/4"
    | "2/4"
    | "3/4"
    | "1/5"
    | "2/5"
    | "3/5"
    | "4/5"
    | "1/6"
    | "2/6"
    | "3/6"
    | "4/6"
    | "5/6"
    | "1/12"
    | "2/12"
    | "3/12"
    | "4/12"
    | "5/12"
    | "6/12"
    | "7/12"
    | "8/12"
    | "9/12"
    | "10/12"
    | "11/12"
    | "full"
    | "screen";

type MinWidthOption = "0" | "full";

type MaxWidthOption =
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl"
    | "full";

type MinHeightOption = "0" | "full" | "screen";

type MaxHeightOption = "full" | "screen";

interface SizingOptions {
    width?: SizeOption | ResponsiveOption<SizeOption>;
    minWidth?: MinWidthOption | ResponsiveOption<MinWidthOption>;
    maxWidth?: MaxWidthOption | ResponsiveOption<MaxWidthOption>;
    height?: SizeOption | ResponsiveOption<SizeOption>;
    minHeight?: MinHeightOption | ResponsiveOption<MinHeightOption>;
    maxHeight?: MaxHeightOption | ResponsiveOption<MaxHeightOption>;
}

type SpaceOption =
    | "0"
    | "1"
    | "2"
    | "3"
    | "4"
    | "5"
    | "6"
    | "8"
    | "10"
    | "12"
    | "16"
    | "20"
    | "24"
    | "32"
    | "40"
    | "48"
    | "56"
    | "64"
    | "px";

type NegativeSpaceOption =
    | "-64"
    | "-56"
    | "-48"
    | "-40"
    | "-32"
    | "-24"
    | "-20"
    | "-16"
    | "-12"
    | "-10"
    | "-8"
    | "-6"
    | "-5"
    | "-4"
    | "-3"
    | "-2"
    | "-1";

type PaddingOptions= "p" | "px" | "py" | "pt" | "pr" | "pb";

type MarginOptions = "m" | "mx" | "my" | "mt" | "mr" | "mb";


type FontSizeOption =
    | "xs"
    | "sm"
    | "base"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl"
    | "inherit";

type FontWeightOption =
    | "hairline"
    | "thin"
    | "light"
    | "normal"
    | "medium"
    | "semibold"
    | "bold"
    | "extrabold"
    | "inherit";

type FontLeadingOption = "none" | "tight" | "snug" | "relaxed" | "loose" | "inherit";

type FontTrackingOption = "tighter" | "tight" | "wide" | "wider" | "widest" | "inherit";

type OverflowOption = "auto" | "hidden" | "visible" | "scroll";

type FontFamilyOption ="font-alba" | "font-albaSuper" | "font-openSans";

type PositionOption = "static" | "fixed" | "absolute" | "relative" | "sticky";

type ShadowOption = "sm" | "md" | "lg" | "xl" | "2xl";

type BorderStyleOption = "solid" | "dashed" | "dotted" | "none";

type BorderRadiusOption = "none" | "xs" | "sm" | "md" | "lg" | "full";

type BorderRadiusOptions =
    | BorderRadiusOption
    | {
          t?: BorderRadiusOption;
          r?: BorderRadiusOption;
          b?: BorderRadiusOption;
          l?: BorderRadiusOption;
      };

type BorderWidthOption = "0" | "1" | "2" | "4" | "8";

type BorderWidthOptions =
    | BorderWidthOption
    | {
          t?: BorderWidthOption;
          r?: BorderWidthOption;
          b?: BorderWidthOption;
          l?: BorderWidthOption;
      };

interface BorderOptions {
    color?: ColorOption;
    style?: BorderStyleOption;
    radius?: BorderRadiusOptions;
    width?: BorderWidthOptions;
}

type RoundedOptions = "full"  | "md"  | "sm";

type RelativeOption = boolean;

type FlexDirectionOption = "row" | "row-reverse" | "col" | "col-reverse";

type FlexDirectionOptions = FlexDirectionOption | ResponsiveOption<FlexDirectionOption>;

type FlexWrapOption = boolean | "wrap" | "wrap-reverse" | "reverse" | "no-wrap";

type AlignItemsOption = "stretch" | "start" | "center" | "end" | "baseline";

type AlignContentOption = "start" | "center" | "end" | "between" | "around";

type AlignSelfOption = "auto" | "start" | "center" | "end" | "stretch";

type FlexGrowOption = boolean;

type FlexOption = true | "initial" | "1" | "auto" | "none";

type FlexShrinkOption = boolean;

type FloatOption = "right" | "left" | "none" | "clearfix";


type ObjectFitOption = "contain" | "cover" | "fill" | "none" | "scale-down";

type TextAlignOption = "left" | "center" | "right" | "justify";


type VisibilityOption = "visible" | "invisible";

type ObjectPositionOption =
    | "bottom"
    | "center"
    | "left"
    | "left-bottom"
    | "left-top"
    | "right"
    | "right-bottom"
    | "right-top"
    | "top";

type FontStyleOption = "italic" | "not-italic";

type TextDecorationOption = undefined | "underline" | "line-through";

type TextTransformOption = "uppercase" | "lowercase" | "capitalize";

type WhitespaceOption = "normal" | "no-wrap" | "pre" | "pre-line" | "pre-wrap";

type WordWrapOption = "normal" | "words" | "all";

type TruncateOption = boolean;
