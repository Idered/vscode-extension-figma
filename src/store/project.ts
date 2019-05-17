import { figma } from "../utils/figma";
import { ProjectFile } from "./project-file";
import { types } from "mobx-state-tree";

export const Project = types
  .model("Project", {
    id: types.identifier,
    name: types.string
  })
  .views(self => ({
    async files() {
      const files = await figma<{ files: any[] }>(self, `projects/${self.id}/files`);

      return files.data.files.map(item => ProjectFile.create(item));
    }
  }));
