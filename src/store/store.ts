import { types, SnapshotIn, SnapshotOrInstance, cast } from "mobx-state-tree";
import { Team } from "./team";
import { Project } from "./project";
import { ProjectFile } from "./project-file";
import { File } from "./file";

export const Store = types
  .model("Store", {
    token: types.maybe(types.string),
    file: types.maybe(File),
    projectFile: types.maybe(types.reference(ProjectFile)),
    projectFiles: types.array(ProjectFile),
    projects: types.array(Project),
    teams: types.array(Team)
  })
  .actions(self => ({
    setToken(token?: string) {
      self.token = token;
    },
    addTeam(team: SnapshotIn<typeof Team>) {
      self.teams.push(team);
    },
    setProjects(projects: SnapshotOrInstance<typeof self.projects>) {
      self.projects = cast(projects);
    },
    setProjectFiles(projectFiles: SnapshotOrInstance<typeof self.projectFiles>) {
      self.projectFiles = cast(projectFiles);
    },
    setProjectFile(projectFile: SnapshotOrInstance<typeof self.projectFile>) {
      self.projectFile = cast(projectFile);
    },
    setFile(file: SnapshotOrInstance<typeof self.file>) {
      self.file = cast(file);
    }
  }));
