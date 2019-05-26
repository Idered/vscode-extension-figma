import {types} from "mobx-state-tree"
import {Color} from "./color"

export const LayoutGrid = types
  .model("LayoutGrid", {
    pattern: types.enumeration("LayoutGridPattern", [
      "COLUMNS" as const,
      "ROWS" as const,
      "GRID" as const
    ]),
    sectionSize: types.number,
    visible: types.boolean,
    color: Color,
    alignment: types.enumeration("LayoutGridAlignment", [
      "MIN" as const,
      "STRETCH" as const,
      "CENTER" as const
    ]),
    gutterSize: types.number,
    offset: types.number,
    count: types.number
  })
  .views(self => ({
    toCSS() {
      return {
        display: "grid",
        ...{
          COLUMNS: {
            "column-gap": `${self.gutterSize}px`,
            "grid-template-columns": `repeat(${self.count}, ${self.sectionSize}px)`
          },
          ROWS: {
            "row-gap": `${self.gutterSize}px`,
            "grid-template-rows": `repeat(${self.count}, ${self.sectionSize}px)`
          },
          GRID: {}
        }[self.pattern]
      }
    }
  }))
