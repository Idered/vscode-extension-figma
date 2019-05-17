import { types } from "mobx-state-tree";

export const EasingType = types.enumeration("EasingType", ["EASE_IN", "EASE_OUT", "EASE_IN_AND_OUT"]);
