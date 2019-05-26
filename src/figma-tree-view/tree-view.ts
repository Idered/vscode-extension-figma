import * as vscode from "vscode"
import {FigmaTreeDataProvider} from "./provider"
import {Instance} from "mobx-state-tree"
import {Store} from "../store/store"
import {TreeElement} from "./tree-element"

export class FigmaTreeView {
  provider: FigmaTreeDataProvider
  view: vscode.TreeView<TreeElement>
  constructor(context: vscode.ExtensionContext, store: Instance<typeof Store>) {
    this.provider = new FigmaTreeDataProvider(context, store)
    this.view = vscode.window.createTreeView("figmaView", {
      treeDataProvider: this.provider
    })
  }
}
