const { defineConfig } = require('@catpawx/commitlint-config-preset')

const fs = require('node:fs')
const path = require('node:path')

const scopes = fs.readdirSync(path.resolve(__dirname, 'packages'))

module.exports = defineConfig({
  prompt: {
    scopes,
    enableMultipleScopes: true,
  },
})
