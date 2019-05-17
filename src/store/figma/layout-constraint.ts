import { types } from "mobx-state-tree";

export const LayoutConstraint = types.model("LayoutConstraint", {
  vertical: types.enumeration("LayoutConstraintVertical", ["TOP", "BOTTOM", "CENTER", "TOP_BOTTOM", "SCALE"]),
  horizontal: types.enumeration("LayoutConstraintHorizontal", ["LEFT", "RIGHT", "CENTER", "LEFT_RIGHT", "SCALE"])
});
