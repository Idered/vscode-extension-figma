import { figma } from "../utils/figma";
import { File } from "./file";
import { types } from "mobx-state-tree";

export const ProjectFile = types
  .model("ProjectFile", {
    key: types.identifier,
    name: types.string,
    thumbnail_url: types.string,
    last_modified: types.string
  })
  .views(self => ({
    async get() {
      const file = await figma<any>(self, `files/${self.key}`);

      return File.create(file.data);
    }
  }));
