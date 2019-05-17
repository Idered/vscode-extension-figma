import { types } from "mobx-state-tree";

export const Vector = types.model("Vector", {
  x: types.number,
  y: types.number
});
