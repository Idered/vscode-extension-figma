import {types} from "mobx-state-tree"
import {Color} from "./color"
import {BlendMode} from "./blend-mode"
import {Vector} from "./vector"
import {ColorStop} from "./color-stop"
import {Transform} from "./transform"

const ScaleModeType = types.enumeration("PaintScaleMode", ["FILL", "FIT", "TILE", "STRETCH"])

export const Paint = types
  .model("Paint", {
    type: types.enumeration("PaintType", [
      "SOLID",
      "GRADIENT_LINEAR",
      "GRADIENT_RADIAL",
      "GRADIENT_ANGULAR",
      "GRADIENT_DIAMOND",
      "IMAGE",
      "EMOJI"
    ]),
    visible: types.maybe(types.boolean),
    opacity: types.maybe(types.number),
    color: types.maybe(Color),
    blendMode: BlendMode,
    gradientHandlePositions: types.array(Vector),
    gradientStops: types.array(ColorStop),
    scaleMode: types.maybe(ScaleModeType),
    imageTransform: Transform,
    scalingFactor: types.maybe(types.number),
    imageRef: types.maybe(types.string)
  })
  .views(self => ({
    toCSS() {
      return {
        opacity: self.opacity ? self.opacity.toFixed(2) : undefined,
        color: self.color ? self.color.value : undefined
      }
    }
  }))
