import {types} from "mobx-state-tree"
import {rgbToHex} from "../../utils/rgb-to-hex"
import * as vscode from "vscode"

export const Color = types
  .model("Color", {
    r: types.number,
    g: types.number,
    b: types.number,
    a: types.number
  })
  .views(self => ({
    get hex() {
      const parse = (value: number) => Math.round(value * 255)

      return rgbToHex(parse(self.r), parse(self.g), parse(self.b))
    },
    get value() {
      const parse = (value: number) => Math.round(value * 255)

      return `rgba(${parse(self.r)}, ${parse(self.g)}, ${parse(self.b)}, 1)`
    }
  }))
  .views(self => ({
    get uri() {
      return vscode.Uri.parse(`https://via.placeholder.com/16/${self.hex}/${self.hex}`).with({
        scheme: "https"
      })
    }
  }))
