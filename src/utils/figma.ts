import axios from "axios";
import { getRoot, IAnyStateTreeNode } from "mobx-state-tree";
import { Store } from "../store/store";

const FIGMA_API = "https://api.figma.com/v1/";

export function figma<T>(self: IAnyStateTreeNode, path: string) {
  const store = getRoot<typeof Store>(self);

  return axios.get<T>(`${FIGMA_API}${path}`, {
    headers: {
      "X-FIGMA-TOKEN": store.token
    }
  });
}
