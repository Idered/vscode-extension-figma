import * as vscode from "vscode"
import {STORAGE_KEYS} from "./constants"
import {Style} from "./store/figma/style"
import {FigmaTreeView} from "./figma-tree-view"
import {createStore} from "./utils/create-store"
import {Instance} from "mobx-state-tree"
import {FigmaTreeItem} from "./figma-tree-view/tree-item"

export function activate(context: vscode.ExtensionContext) {
  const store = createStore(context)
  const tree = new FigmaTreeView(context, store)
  let panel: vscode.WebviewPanel | undefined = undefined

  function getWebviewContent({
    fileId,
    fileName,
    nodeId
  }: {
    fileId?: string
    fileName?: string
    nodeId?: string
  }) {
    return `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Cat Coding</title>
        </head>
        <body style="padding: 0;">
          <iframe
            src="https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/file/${fileId}/${fileName}?node-id=${nodeId}"
            allowfullscreen
          ></iframe>
          <style>
            iframe {
              border: none;
              width: 100vw;
              height: 100vh;
            }
          </style>
        </body>
      </html>
    `
  }

  vscode.commands.registerCommand("extension.copyCSS", async (style: Instance<typeof Style>) => {
    const editor = vscode.window.activeTextEditor
    if (editor) {
      editor.edit(editBuilder => {
        editBuilder.replace(editor.selection, style.toCSS(editor.selection.start.character))
      })
    }
  })

  // FIGMA: CONNECT
  context.subscriptions.push(
    vscode.commands.registerCommand("figma.connect", async () => {
      let token = await vscode.window.showInputBox({
        placeHolder: "Figma Personal Access Token",
        value: context.globalState.get(STORAGE_KEYS.TOKEN)
      })

      if (token) {
        store.setToken(token)
        tree.provider.refresh()
      }
    })
  )

  // FIGMA: VIEW LAYER
  context.subscriptions.push(
    vscode.commands.registerCommand("figma.viewLayer", async (node: FigmaTreeItem) => {
      if (panel) {
        // If we already have a panel, show it in the target column
        panel.reveal()
      } else {
        // Otherwise, create a new panel
        panel = vscode.window.createWebviewPanel(
          "figma", // Identifies the type of the webview. Used internally
          "Figma Preview", // Title of the panel displayed to the user
          vscode.ViewColumn.Two,
          {
            enableScripts: true
          }
        )
        // Reset when the current panel is closed
        panel.onDidDispose(
          () => {
            panel = undefined
          },
          null,
          context.subscriptions
        )
      }

      if (panel && store.file && store.fileId && node.id) {
        panel.webview.html = getWebviewContent({
          fileId: store.fileId,
          fileName: store.file.name,
          nodeId: node.id
        })
      }
    })
  )

  // FIGMA: ADD TEAM
  context.subscriptions.push(
    vscode.commands.registerCommand("figma.addTeam", async () => {
      let name = await vscode.window.showInputBox({placeHolder: "Team name"})
      if (!name) return
      let id = await vscode.window.showInputBox({placeHolder: "Team ID"})
      if (!id) return
      store.addTeam({name, id})
      tree.provider.refresh()
    })
  )

  // FIGMA: SELECT FILE
  context.subscriptions.push(
    vscode.commands.registerCommand("figma.selectFile", async () => {
      let pick

      // Choose team
      pick = await vscode.window.showQuickPick(
        store.teams.map(item => ({id: item.id, label: item.name})),
        {
          placeHolder: "Choose a team"
        }
      )

      if (pick === undefined) return

      store.setTeam(pick.id)

      // Load projects
      await vscode.window.withProgress(
        {
          title: "Loading projects...",
          location: vscode.ProgressLocation.Notification
        },
        () => store.loadProjects()
      )

      // Choose project
      pick = await vscode.window.showQuickPick(
        store.projects.map(item => ({label: item.name, id: item.id})),
        {
          placeHolder: "Choose a project"
        }
      )

      if (pick === undefined) return

      store.setProject(pick.id)

      // Load project files
      await vscode.window.withProgress(
        {
          title: "Loading project files...",
          location: vscode.ProgressLocation.Notification
        },
        () => store.loadProjectFiles()
      )

      // Choose project file
      pick = await vscode.window.showQuickPick(
        store.projectFiles.map(item => ({label: item.name, id: item.key})),
        {
          placeHolder: "Choose a project file"
        }
      )

      if (pick === undefined) return

      store.setProjectFile(pick.id)

      // Load selected project file
      await vscode.window.withProgress(
        {
          title: "Loading project file...",
          location: vscode.ProgressLocation.Notification
        },
        () => store.loadFile()
      )

      store.loadStyles().then(() => {
        tree.provider.refresh()
      })
    })
  )
}

export function deactivate() {}
