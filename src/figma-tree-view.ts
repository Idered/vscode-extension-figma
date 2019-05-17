import * as vscode from "vscode";
import { Store } from "./store/store";
import { Instance } from "mobx-state-tree";

export class FigmaTreeView {
  provider: FigmaTreeDataProvider;
  constructor(context: vscode.ExtensionContext, store: Instance<typeof Store>) {
    this.provider = new FigmaTreeDataProvider(context, store);

    vscode.window.createTreeView("figmaView", {
      treeDataProvider: this.provider
    });
  }
}

class FigmaTreeDataProvider implements vscode.TreeDataProvider<FigmaTreeItem> {
  context: vscode.ExtensionContext;
  store: Instance<typeof Store>;
  private _onDidChangeTreeData: vscode.EventEmitter<FigmaTreeItem | undefined> = new vscode.EventEmitter<
    FigmaTreeItem | undefined
  >();
  readonly onDidChangeTreeData: vscode.Event<FigmaTreeItem | undefined> = this._onDidChangeTreeData.event;

  constructor(context: vscode.ExtensionContext, store: Instance<typeof Store>) {
    this.context = context;
    this.store = store;
  }

  refresh(): void {
    this._onDidChangeTreeData.fire();
  }

  getTreeItem(element: FigmaTreeItem) {
    return element;
  }

  getChildren(element?: FigmaTreeItem): Thenable<FigmaTreeItem[]> {
    if (this.store.file === undefined) {
      return Promise.resolve([
        new FigmaTreeItem({
          label: 'Use "Figma: Select File" command',
          collapsibleState: vscode.TreeItemCollapsibleState.None
        })
      ]);
    }

    if (element === undefined) {
      // Get top level items
      return Promise.resolve(this.getTopLevelItems());
    }

    return Promise.resolve([]);
  }

  private getTopLevelItems(): FigmaTreeItem[] {
    return [
      {
        label: "Styles",
        collapsibleState: vscode.TreeItemCollapsibleState.Collapsed
      }
    ].map(item => new FigmaTreeItem(item));
  }
}

class FigmaTreeItem extends vscode.TreeItem {
  constructor(props: {
    readonly label: string;
    readonly collapsibleState: vscode.TreeItemCollapsibleState;
    readonly command?: vscode.Command;
  }) {
    super(props.label, props.collapsibleState);
  }

  get tooltip(): string {
    return `${this.label}`;
  }

  // get description(): string {
  //   // return undefined;
  // }
}
