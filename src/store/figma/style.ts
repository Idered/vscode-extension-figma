import {types, SnapshotIn, cast} from "mobx-state-tree"
import {Paint} from "./paint"
import {Effect} from "./effect"
import {TypeStyle} from "./type-style"
import {objectToCss} from "../../utils/object-to-css"
import {LayoutGrid} from "./layout-grid"

const StyleProps = types.model("StyleProps", {
  layoutGrids: types.maybe(types.array(LayoutGrid)),
  fills: types.maybe(types.array(Paint)),
  effects: types.maybe(types.array(Effect)),
  style: types.maybe(TypeStyle)
})

export const Style = types
  .model("Style", {
    key: types.maybe(types.string),
    name: types.string,
    styleType: types.enumeration("StyleType", [
      "FILL" as const,
      "TEXT" as const,
      "EFFECT" as const,
      "GRID" as const
    ]),
    props: types.maybe(StyleProps)
  })
  .actions(self => ({
    setProps(props: SnapshotIn<typeof StyleProps>) {
      self.props = cast(props)
    }
  }))
  .views(self => ({
    toCSS(indent = 0) {
      let css = {}
      if (self.props === undefined) return ""
      if (self.styleType === "GRID" && self.props.layoutGrids) {
        css = self.props.layoutGrids
          .map(item => item.toCSS())
          .reduce((all, current) => ({...all, ...current}))
      }
      if (self.styleType === "FILL" && self.props.fills) {
        css = self.props.fills
          .map(item => item.toCSS())
          .reduce((all, current) => ({...all, ...current}))
      }
      if (self.styleType === "TEXT" && self.props.style) {
        css = self.props.style.toCSS()
      }
      return objectToCss(css, indent)
    }
  }))
