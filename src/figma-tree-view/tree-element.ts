import * as vscode from "vscode"

export type TreeElement = {
  id: string
  parentId?: string
  label?: string
  description?: string
  contextValue?: string
  command?: vscode.Command
  collapsibleState?: vscode.TreeItemCollapsibleState
}
