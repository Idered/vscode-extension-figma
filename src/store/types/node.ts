import { types, IAnyModelType } from "mobx-state-tree";
import { BlendMode } from "./blend-mode";
import { NodeType } from "./node-type";
import { Color } from "./color";
import { Rectangle } from "./rectangle";
import { LayoutConstraint } from "./layout-constraint";
import { Paint } from "./paint";
import { Effect } from "./effect";
import { TypeStyle } from "./type-style";
import { ExportSetting } from "./export-settings";
import { Vector } from "./vector";
import { Transform } from "./transform";
import { LayoutGrid } from "./layout-grid";

const BooleanOperationType = types.enumeration("BooleanOperation", ["UNION", "INTERSECT", "SUBTRACT", "EXCLUDE"]);
const StrokeAlignType = types.enumeration("StrokeAlign", ["INSIDE", "OUTSIDE", "CENTER"]);
const StrokeCapType = types.enumeration("StrokeCap", ["NONE", "ROUND", "SQUARE", "LINE_ARROW", "TRIANGLE_ARROW"]);
const StrokeJoinType = types.enumeration("StrokeJoin", ["MITTER", "BEVEL", "ROUND"]);

export const Node = types.model("Node", {
  absoluteBoundingBox: types.maybe(Rectangle),
  background: types.maybe(types.array(Paint)),
  backgroundColor: types.maybe(Color),
  blendMode: types.maybe(BlendMode),
  booleanOperation: types.maybe(BooleanOperationType),
  characters: types.maybe(types.string),
  characterStyleOverrides: types.maybe(types.array(types.number)),
  children: types.maybe(types.array(types.late((): IAnyModelType => Node))),
  clipsContent: types.maybe(types.boolean),
  componentId: types.maybe(types.string),
  constraints: types.maybe(LayoutConstraint),
  cornerRadius: types.maybe(types.number),
  effects: types.maybe(types.array(Effect)),
  exportSettings: types.maybe(types.array(ExportSetting)),
  fills: types.maybe(types.array(Paint)),
  id: types.string,
  isMask: types.maybe(types.boolean),
  isMaskOutline: types.maybe(types.boolean),
  layoutGrids: types.maybe(types.array(LayoutGrid)),
  name: types.string,
  opacity: types.maybe(types.number),
  preserveRatio: types.maybe(types.boolean),
  prototypeStartNodeID: types.maybeNull(types.string),
  rectangleCornerRadii: types.maybe(types.array(types.number)),
  relativeTransform: types.maybe(Transform),
  size: types.maybe(Vector),
  strokeAlign: types.maybe(StrokeAlignType),
  strokeCap: types.maybe(StrokeCapType),
  strokeDashes: types.maybe(types.array(types.number)),
  strokeJoin: types.maybe(StrokeJoinType),
  strokeMiterAngle: types.maybe(types.number),
  strokes: types.maybe(types.array(Paint)),
  style: types.maybe(TypeStyle),
  styleOverrideTable: types.maybe(types.map(TypeStyle)),
  styles: types.maybe(types.map(types.string)),
  type: NodeType
});
