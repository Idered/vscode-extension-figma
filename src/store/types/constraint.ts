import { types } from "mobx-state-tree";

export const Constraint = types.model("Constraint", {
  type: types.enumeration("ConstraintType", ["SCALE", "WIDTH", "HEIGHT"]),
  value: types.number
});
