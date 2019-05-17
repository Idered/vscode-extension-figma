import { types } from "mobx-state-tree";

export const NodeType = types.enumeration("NodeType", [
  "DOCUMENT",
  "CANVAS",
  "FRAME",
  "INSTANCE",
  "RECTANGLE",
  "GROUP",
  "TEXT",
  "VECTOR",
  "BOOLEAN_OPERATION",
  "STAR",
  "LINE",
  "ELLIPSE",
  "REGULAR_POLYGON",
  "SLICE",
  "COMPONENT"
]);
