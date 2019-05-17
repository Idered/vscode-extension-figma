import { types } from "mobx-state-tree";
import { Paint } from "./paint";

const TextCaseType = types.enumeration("TextCase", ["ORIGINAL", "UPPER", "LOWER", "TITLE"]);
const TextDecorationType = types.enumeration("TextDecoration", ["NONE", "STRIKETHROUGH", "UNDERLINE"]);
const TextAlignHorizontalType = types.enumeration("TextAlignHorizontal", ["LEFT", "RIGHT", "CENTER", "JUSTIFIED"]);
const TextAlignVerticalType = types.enumeration("TextAlignVertical", ["TOP", "CENTER", "BOTTOM"]);
const LineHeightUnitType = types.enumeration("LineHeightUnit", ["PIXELS", "FONT_SIZE_%", "INTRINSIC_%"]);

export const TypeStyle = types.model("TypeStyle", {
  fontFamily: types.maybe(types.string),
  fontPostScriptName: types.maybeNull(types.string),
  paragraphSpacing: types.maybe(types.number),
  paragraphIndent: types.maybe(types.number),
  italic: types.maybe(types.boolean),
  fontWeight: types.maybe(types.number),
  fontSize: types.maybe(types.number),
  textCase: types.maybe(TextCaseType),
  textDecoration: types.maybe(TextDecorationType),
  textAlignHorizontal: types.maybe(TextAlignHorizontalType),
  textAlignVertical: types.maybe(TextAlignVerticalType),
  letterSpacing: types.maybe(types.number),
  fills: types.array(Paint),
  lineHeightPx: types.maybe(types.number),
  lineHeightPercent: types.maybe(types.number),
  lineHeightPercentFontSize: types.maybe(types.number),
  lineHeightUnit: types.maybe(LineHeightUnitType)
});
