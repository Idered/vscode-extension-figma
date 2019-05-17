// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { onSnapshot, addMiddleware } from "mobx-state-tree";
import { simpleActionLogger } from "mst-middlewares";
import { Store } from "./store/store";
import { FigmaTreeView } from "./figma-tree-view";

const STORAGE_KEYS = {
  TOKEN: "figma-api-token",
  TEAMS: "figma-teams",
  FILES: "figma-files"
};

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  const store = Store.create({
    token: context.globalState.get(STORAGE_KEYS.TOKEN),
    teams: context.globalState.get(STORAGE_KEYS.TEAMS)
  });

  addMiddleware(store, simpleActionLogger);

  onSnapshot(store, snapshot => {
    context.globalState.update(STORAGE_KEYS.TOKEN, snapshot.token);
    context.globalState.update(STORAGE_KEYS.TEAMS, snapshot.teams);
  });

  const tree = new FigmaTreeView(context, store);

  // FIGMA: CONNECT
  context.subscriptions.push(
    vscode.commands.registerCommand("figma.connect", async () => {
      let token = await vscode.window.showInputBox({
        placeHolder: "Figma Personal Access Token",
        value: context.globalState.get(STORAGE_KEYS.TOKEN)
      });

      if (token) {
        store.setToken(token);
      }
    })
  );

  // FIGMA: ADD TEAM
  context.subscriptions.push(
    vscode.commands.registerCommand("figma.addTeam", async () => {
      let name = await vscode.window.showInputBox({ placeHolder: "Team name" });
      let id = await vscode.window.showInputBox({ placeHolder: "Team ID" });

      if (name && id) {
        store.addTeam({ name, id });
      }
    })
  );

  // FIGMA: SELECT FILE
  context.subscriptions.push(
    vscode.commands.registerCommand("figma.selectFile", async () => {
      // Choose team
      const teamItems = store.teams.map(item => ({
        id: item.id,
        label: item.name
      }));
      const teamChoice = await vscode.window.showQuickPick(teamItems, {
        placeHolder: "Choose a team"
      });
      if (teamChoice === undefined) return;
      const team = store.teams.find(item => item.id === teamChoice.id);
      if (team === undefined) return;

      // Load projects
      const projects = await vscode.window.withProgress(
        {
          title: "Loading projects...",
          location: vscode.ProgressLocation.Notification
        },
        () => team.projects()
      );
      store.setProjects(projects);

      // Choose project
      const projectItems = store.projects.map(item => ({ label: item.name, id: item.id }));
      const projectChoice = await vscode.window.showQuickPick(projectItems, {
        placeHolder: "Choose a project"
      });
      if (projectChoice === undefined) return;
      const project = store.projects.find(item => item.id === projectChoice.id);
      if (project === undefined) return;

      // Load project files
      const projectFiles = await vscode.window.withProgress(
        {
          title: "Loading project files...",
          location: vscode.ProgressLocation.Notification
        },
        () => project.files()
      );
      store.setProjectFiles(projectFiles);

      // Choose project file
      const projectFileItems = store.projectFiles.map(item => ({ label: item.name, key: item.key }));
      const projectFileChoice = await vscode.window.showQuickPick(projectFileItems, {
        placeHolder: "Choose a project file"
      });
      if (projectFileChoice === undefined) return;
      const projectFile = store.projectFiles.find(item => item.key === projectFileChoice.key);
      if (projectFile === undefined) return;

      store.setProjectFile(projectFile);

      // Load selected project file
      const file = await vscode.window.withProgress(
        {
          title: "Loading project file...",
          location: vscode.ProgressLocation.Notification
        },
        () => projectFile.get()
      );
      store.setFile(file);
      tree.provider.refresh();
    })
  );
}

// this method is called when your extension is deactivated
export function deactivate() {}
