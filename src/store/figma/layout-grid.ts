import { types } from "mobx-state-tree";
import { Color } from "./color";

export const LayoutGrid = types.model("LayoutGrid", {
  pattern: types.enumeration("LayoutGridPattern", ["COLUMNS", "ROWS", "GRID"]),
  sectionSize: types.number,
  visible: types.boolean,
  color: Color,
  alignment: types.enumeration("LayoutGridAlignment", ["MIN", "STRETCH", "CENTER"]),
  gutterSize: types.number,
  offset: types.number,
  count: types.number
});
