import {types} from "mobx-state-tree"

export const Component = types.model("Component", {
  key: types.string,
  name: types.string,
  description: types.string
})
