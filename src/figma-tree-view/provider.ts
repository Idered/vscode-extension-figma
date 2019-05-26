import * as vscode from "vscode"
import {Instance} from "mobx-state-tree"
import {Store} from "../store/store"
import {Node} from "../store/figma/node"
import {FigmaTreeItem} from "./tree-item"
import * as treeItems from "./tree-items"
import * as traverse from "traverse"
import {TreeElement} from "./tree-element"
import {NodeType} from "../store/figma/node-type"

function getCollapsibleStateForItem(item: Instance<typeof Node>) {
  return item.children === undefined || item.children.length === 0
    ? vscode.TreeItemCollapsibleState.None
    : vscode.TreeItemCollapsibleState.Collapsed
}

export class FigmaTreeDataProvider implements vscode.TreeDataProvider<TreeElement> {
  context: vscode.ExtensionContext
  store: Instance<typeof Store>
  private _onDidChangeTreeData: vscode.EventEmitter<
    TreeElement | undefined
  > = new vscode.EventEmitter<TreeElement | undefined>()
  readonly onDidChangeTreeData: vscode.Event<TreeElement | undefined> = this._onDidChangeTreeData
    .event

  constructor(context: vscode.ExtensionContext, store: Instance<typeof Store>) {
    this.context = context
    this.store = store
  }

  refresh(): void {
    this._onDidChangeTreeData.fire()
  }

  getTreeItem(element: TreeElement): FigmaTreeItem {
    return new FigmaTreeItem(element)
  }

  getParent(element: TreeElement) {
    let parent

    if (this.store.file === undefined) return Promise.resolve(undefined)
    if (element.parentId === undefined) return Promise.resolve(undefined)

    traverse(this.store.file.document.children).forEach(function(item: Instance<typeof Node>) {
      if (item.id === element.parentId) {
        parent = item
        this.stop()
      }
    })

    return Promise.resolve(parent)
  }

  getChildren(element?: TreeElement): Thenable<TreeElement[]> {
    if (this.store.token === undefined) {
      return Promise.resolve([treeItems.addToken])
    }

    if (this.store.teams.length === 0) {
      return Promise.resolve([treeItems.addTeam])
    }

    if (this.store.file === undefined) {
      return Promise.resolve([treeItems.selectFile])
    }

    if (element === undefined) {
      return Promise.resolve(this.getTopLevelItems())
    }

    if (element.contextValue === "styles") {
      return this.getChildrenForStyles()
    }

    if (element.contextValue === "pages") {
      return this.getChildrenForPages()
    }
    
    return this.getChildrenForNode(element.id)
  }

  private getChildrenForNode = (pageId: string) => {
    if (this.store.file === undefined) return Promise.resolve([])
    let children: TreeElement[] = []
    traverse(this.store.file.document.children.slice().reverse()).forEach(function(
      item: Instance<typeof Node>
    ) {
      if (item && item.id === pageId) {
        if (item.children === undefined) return this.stop()
        item.children
          .slice()
          .reverse()
          .forEach((child: Instance<typeof Node>) => {
            children.push({
              id: child.id,
              parentId: item.id,
              label: child.name,
              collapsibleState: getCollapsibleStateForItem(child),
              contextValue: `${child.type}_${this.level}`
            })
          })
        this.stop()
      }
    })
    return Promise.resolve(children)
  }

  private getChildrenForPages = () => {
    if (this.store.file === undefined) return Promise.resolve([])
    const pages: TreeElement[] = this.store.file.document.children.map(item => ({
      id: item.id,
      label: item.name,
      contextValue: item.type,
      collapsibleState:
        item.children === undefined || item.children.length === 0
          ? vscode.TreeItemCollapsibleState.None
          : vscode.TreeItemCollapsibleState.Collapsed
    }))
    return Promise.resolve(pages)
  }

  private getChildrenForStyles = () => {
    if (this.store.file === undefined) return Promise.resolve([])

    const styles = [...this.store.file.styles.values()].map(style => {
      let iconPath

      if (
        style.styleType === "FILL" &&
        style.props &&
        style.props.fills &&
        style.props.fills[0] &&
        style.props.fills[0].color
      ) {
        iconPath = style.props.fills[0].color.uri
      }

      return <TreeElement>{
        id: `${style.key}-${style.name}`,
        label: style.name,
        description: style.styleType,
        iconPath,
        command: {
          title: "Copy CSS",
          arguments: [style],
          command: "extension.copyCSS",
          tooltip: " Copy CSS Tooltip"
        }
      }
    })

    styles.sort((a, b) => {
      if (a.description !== b.description) {
        return ("" + a.description).localeCompare(String(b.description))
      }
      return ("" + a.label).localeCompare(String(b.label))
    })

    return Promise.resolve(styles)
  }

  private getTopLevelItems(): TreeElement[] {
    return [
      {
        id: "pages",
        label: "Pages",
        contextValue: "pages",
        collapsibleState: vscode.TreeItemCollapsibleState.Expanded
      },
      {
        id: "styles",
        label: "Styles",
        contextValue: "styles",
        collapsibleState: vscode.TreeItemCollapsibleState.Expanded
      }
    ]
  }
}
