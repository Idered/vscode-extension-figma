export const hyphenate = (s: string) =>
  s.replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`).replace(/^ms-/, "-ms-")
