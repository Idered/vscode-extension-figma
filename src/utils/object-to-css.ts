import {hyphenate} from "./hyphenate"

export const objectToCss = (css: object, indent = 0) =>
  Object.entries(css)
    .filter(([, value]) => value !== undefined)
    .reduce(
      (all, [key, value]) =>
        `${all ? `${all}\n${" ".repeat(indent)}` : ""}${[hyphenate(key)]}: ${value};`,
      ""
    )
