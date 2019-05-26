import {types} from "mobx-state-tree"
import {Color} from "./color"

export const ColorStop = types.model("ColorStop", {
  position: types.number,
  color: Color
})
