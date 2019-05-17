import { types } from "mobx-state-tree";
import { Color } from "./color";
import { BlendMode } from "./blend-mode";
import { Vector } from "./vector";

export const Effect = types.model("Effect", {
  type: types.enumeration("EffectType", ["INNER_SHADOW", "DROP_SHADOW", "LAYER_BLUR", "BACKGROUND_BLUR"]),
  visible: types.boolean,
  radius: types.number,
  color: types.maybe(Color),
  blendMode: types.maybe(BlendMode),
  offset: types.maybe(Vector)
});
