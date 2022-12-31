module.exports = {
  "**/*.{tsx,ts,mts,mcs,mjs,cjs,js,json,md,yml,yaml}": [
    "prettier --write",
    "cspell lint --gitignore --cache",
  ],
  "**/*.{tsx,ts,mts,mcs}": ["eslint --cache --fix"],
}
