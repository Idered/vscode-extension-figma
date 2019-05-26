import {Store} from "../store/store"
import {ExtensionContext} from "vscode"
import {STORAGE_KEYS} from "../constants"
import {addMiddleware, onSnapshot} from "mobx-state-tree"
import {simpleActionLogger} from "mst-middlewares"

export function createStore(context: ExtensionContext) {
  const store = Store.create({
    file: context.globalState.get(STORAGE_KEYS.FILE),
    token: context.globalState.get(STORAGE_KEYS.TOKEN),
    teams: context.globalState.get(STORAGE_KEYS.TEAMS)
  })

  addMiddleware(store, simpleActionLogger)

  onSnapshot(store, snapshot => {
    context.globalState.update(STORAGE_KEYS.TOKEN, snapshot.token)
    context.globalState.update(STORAGE_KEYS.TEAMS, snapshot.teams)
  })

  return store
}
