import {types} from "mobx-state-tree"
import {Component} from "./figma/component"
import {Style} from "./figma/style"
import {Document} from "./figma/document"

export const File = types.model("File", {
  document: Document,
  name: types.string,
  schemaVersion: types.number,
  components: types.map(Component),
  styles: types.map(Style),
  lastModified: types.string,
  thumbnailUrl: types.string,
  version: types.string
})
