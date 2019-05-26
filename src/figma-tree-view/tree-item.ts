import * as vscode from "vscode"

export class FigmaTreeItem extends vscode.TreeItem {
  constructor(props: {
    readonly id?: string
    readonly label?: string
    readonly description?: string
    readonly iconPath?: string
    readonly contextValue?: string
    readonly collapsibleState?: vscode.TreeItemCollapsibleState
    readonly command?: vscode.Command
  }) {
    super(props.label || "undefined label", props.collapsibleState)
    this.id = props.id
    this.command = props.command
    this.iconPath = props.iconPath
    this.description = props.description
    this.contextValue = props.contextValue
  }

  get tooltip(): string {
    return `${this.label}`
  }
}
