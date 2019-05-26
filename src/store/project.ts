import {types} from "mobx-state-tree"

export const Project = types.model("Project", {
  id: types.identifier,
  name: types.string
})
