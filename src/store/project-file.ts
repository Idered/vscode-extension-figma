import {types} from "mobx-state-tree"

export const ProjectFile = types.model("ProjectFile", {
  key: types.identifier,
  name: types.string,
  thumbnail_url: types.string,
  last_modified: types.string
})
