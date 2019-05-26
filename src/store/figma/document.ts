import {types} from "mobx-state-tree"
import {NodeType} from "./node-type"
import {Node} from "./node"

export const Document = types.model("Document", {
  id: types.string,
  name: types.string,
  type: NodeType,
  children: types.array(Node)
})
