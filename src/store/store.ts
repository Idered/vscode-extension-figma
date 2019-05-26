import {types, SnapshotIn, SnapshotOrInstance, cast} from "mobx-state-tree"
import {Team} from "./team"
import {Project} from "./project"
import {ProjectFile} from "./project-file"
import {Node} from "./figma/node"
import {File} from "./file"
import {figma} from "../utils/figma"

interface NodesResponse {
  nodes: {
    [key: string]: {
      document: SnapshotIn<typeof Node>
    }
  }
}

export const Store = types
  .model("Store", {
    token: types.maybe(types.string),
    file: types.maybe(File),
    fileId: types.maybe(types.string),
    projectFile: types.maybe(types.reference(ProjectFile)),
    projectFiles: types.array(ProjectFile),
    project: types.maybe(types.reference(Project)),
    projects: types.array(Project),
    team: types.maybe(types.reference(Team)),
    teams: types.array(Team)
  })
  .actions(self => ({
    setToken(token?: string) {
      self.token = token
    },
    addTeam(team: SnapshotIn<typeof Team>) {
      self.teams.push(team)
    },
    setTeam(team: SnapshotOrInstance<typeof self.team>) {
      self.team = cast(team)
    },
    setProjects(projects: SnapshotOrInstance<typeof self.projects>) {
      self.projects = cast(projects)
    },
    setProject(project: SnapshotOrInstance<typeof self.project>) {
      self.project = cast(project)
    },
    setProjectFiles(projectFiles: SnapshotOrInstance<typeof self.projectFiles>) {
      self.projectFiles = cast(projectFiles)
    },
    setProjectFile(projectFile: SnapshotOrInstance<typeof self.projectFile>) {
      self.projectFile = cast(projectFile)
    },
    setFile(file: SnapshotOrInstance<typeof self.file>) {
      self.file = cast(file)
    },
    setFileId(id: string) {
      self.fileId = id
    }
  }))
  .actions(self => ({
    async loadStyles() {
      if (self.projectFile !== undefined && self.file !== undefined) {
        try {
          const response = await figma<NodesResponse>(self, `files/${self.projectFile.key}/nodes`, {
            params: {ids: [...self.file.styles.keys()].join(",")}
          })

          Array.from(self.file.styles.entries()).forEach(([nodeId, node]) => {
            const relatedNode = response.data.nodes[nodeId]

            if (relatedNode === undefined) return {}

            node.setProps({
              layoutGrids: relatedNode.document.layoutGrids,
              fills: relatedNode.document.fills,
              effects: relatedNode.document.effects,
              style: relatedNode.document.style
            })
          })
        } catch (err) {}
      }

      return undefined
    },
    loadProjects: async () => {
      if (self.team === undefined) return
      try {
        const response = await figma<{projects: any[]}>(self, `teams/${self.team.id}/projects`)
        console.log({response})
        self.setProjects(response.data.projects)
        return self.projects
      } catch (err) {
        console.log(err)
      }
    },
    loadProjectFiles: async () => {
      if (self.project === undefined) return
      const response = await figma<{files: any[]}>(self, `projects/${self.project.id}/files`)

      self.setProjectFiles(response.data.files)

      return self.projectFiles
    },
    async loadFile() {
      if (self.projectFile === undefined) return
      const response = await figma<any>(self, `files/${self.projectFile.key}`)

      self.setFile(response.data)
      self.setFileId(self.projectFile.key)

      return self.file
    }
  }))
