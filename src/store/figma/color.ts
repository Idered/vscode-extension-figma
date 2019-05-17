import { types } from "mobx-state-tree";

export const Color = types.model("Color", {
  r: types.number,
  g: types.number,
  b: types.number,
  a: types.number
});
