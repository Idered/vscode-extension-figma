import { types } from "mobx-state-tree";
import { Constraint } from "./constraint";

export const ExportSetting = types.model("ExportSetting", {
  suffix: types.string,
  format: types.string,
  constraint: Constraint
});
