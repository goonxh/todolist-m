module.exports = {
  'presets': [
    '@vue/babel-preset-jsx',
    [
      '@babel/preset-env',
      {
        'modules': false,
        'targets': {
          // 'browsers': ' >1%, ie >=11, not dead'
        },
        'useBuiltIns': 'usage',
      },
    ],
  ],
  'plugins': [
    ['import', {
      'libraryName': 'ant-design-vue',
      'style': 'css',
    }],
    [
      '@babel/plugin-proposal-pipeline-operator',
      {
        'proposal': 'minimal',
      },
    ],
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-function-bind',
    '@babel/plugin-proposal-do-expressions',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-syntax-import-meta',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-json-strings',
    [
      '@babel/plugin-proposal-decorators',
      {
        'legacy': true,
      },
    ],
    '@babel/plugin-proposal-function-sent',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-proposal-numeric-separator',
    '@babel/plugin-proposal-throw-expressions',
    // var foo = object.foo ?? "default";
    '@babel/plugin-proposal-nullish-coalescing-operator',
  ],
  'comments': true,
  'env': {},
};
