const {CracoAliasPlugin } = require('react-app-rewire-alias')

const aliasMap = {
  "@components": "src/components",
  "@pages": "src/pages",
  "@hooks": "src/hooks",
  "@plugins": "src/plugins",
  "@services": "src/services",
  "@utils": "src/utils",
  "@api": "src/api",
  "@app": "src",
}

module.exports = {
  plugins: [
    {
      plugin: CracoAliasPlugin,
      options: {alias: aliasMap }
    }
  ],
};