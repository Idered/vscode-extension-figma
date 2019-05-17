import { figma } from "../utils/figma";
import { Project } from "./project";
import { types } from "mobx-state-tree";

export const Team = types
  .model("Team", {
    id: types.identifier,
    name: types.string
  })
  .views(self => ({
    async projects() {
      const projects = await figma<{ projects: any[] }>(self, `teams/${self.id}/projects`);

      return projects.data.projects.map(item => Project.create(item));
    }
  }));
