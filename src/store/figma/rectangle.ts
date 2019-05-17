import { types } from "mobx-state-tree";

export const Rectangle = types.model("Rectangle", {
  x: types.number,
  y: types.number,
  width: types.number,
  height: types.number
});
