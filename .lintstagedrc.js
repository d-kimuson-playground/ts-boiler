module.exports = {
  "**/*.{ts,js,json,md,yml,yaml}": ["prettier --write"],
  "**/*.ts": ["eslint --cache --fix"],
}
