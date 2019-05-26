import {types} from "mobx-state-tree"

export const Team = types.model("Team", {
  id: types.identifier,
  name: types.string
})
