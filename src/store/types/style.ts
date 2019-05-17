import { types } from "mobx-state-tree";

export const Style = types.model("Style", {
  key: types.maybe(types.string),
  name: types.string,
  styleType: types.enumeration("StyleType", ["FILL", "TEXT", "EFFECT", "GRID"])
});
