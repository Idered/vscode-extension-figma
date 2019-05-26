import axios, {AxiosRequestConfig} from "axios"
import {getRoot, IAnyStateTreeNode} from "mobx-state-tree"
import {Store} from "../store/store"
import {FIGMA_API} from "../constants"

export function figma<T>(self: IAnyStateTreeNode, path: string, config?: AxiosRequestConfig) {
  const store = getRoot<typeof Store>(self)

  return axios.get<T>(`${FIGMA_API}${path}`, {
    ...config,
    headers: {
      ...(config ? config.headers : {}),
      "X-FIGMA-TOKEN": store.token
    }
  })
}
