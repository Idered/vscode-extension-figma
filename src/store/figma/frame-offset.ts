import {types} from "mobx-state-tree"
import {Vector} from "./vector"

export const FrameOffset = types.model("FrameOffset", {
  nodeId: types.string,
  nodeOffset: Vector
})
