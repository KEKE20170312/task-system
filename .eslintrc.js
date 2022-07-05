module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['eslint:recommended', 'plugin:vue/essential', '@vue/standard'],
  parserOptions: {
    parser: 'babel-eslint'
  },
  globals: {
    showErrorMsg: true,
    showSuccessMsg: true,
    showWarningMsg: true,
    showMsg: true
  },
  rules: {
    'vue/order-in-components': [
      'error',
      {
        order: [
          'el',
          'name',
          'key',
          'parent',
          'functional',
          ['delimiters', 'comments'],
          ['components', 'directives', 'filters'],
          'extends',
          'mixins',
          ['provide', 'inject'],
          'ROUTER_GUARDS',
          'layout',
          'middleware',
          'validate',
          'scrollToTop',
          'transition',
          'loading',
          'inheritAttrs',
          'model',
          ['props', 'propsData'],
          'emits',
          'setup',
          'asyncData',
          'data',
          'fetch',
          'head',
          'computed',
          'watch',
          'watchQuery',
          'LIFECYCLE_HOOKS',
          'methods',
          ['template', 'render'],
          'renderError'
        ]
      }
    ],
    'no-console': 'off',
    camelcase: [0, { properties: 'never' }], // 除了对象属性以外，强制使用骆驼拼写法命名约定
    indent: [2, 2, { SwitchCase: 1, ignoredNodes: ['ConditionalExpression'], MemberExpression: 1 }], // ConditionalExpression (三元表达式)节点的缩进
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always'
      }
    ], // 静止 function的左括号之前使用空格
    'prefer-promise-reject-errors': [
      'error',
      {
        allowEmptyReject: true
      }
    ], // Promise.reject()要求使用 new Error(), 允许reject()为空
    'vue/no-parsing-error': [2, { 'x-invalid-end-tag': false }],
    'vue/valid-template-root': 'off',
    'no-useless-constructor': 'off'
  }
}
