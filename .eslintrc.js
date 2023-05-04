module.exports = {
	'env': {
		'browser': true,
		'es2021': true
	},
	'extends': [
		'eslint:recommended',
		'plugin:vue/essential'
	],
	'parserOptions': {
		'ecmaVersion': 12,
		'sourceType': 'module'
	},
	'plugins': [
		'vue'
	],
	'rules': {
		/* 换行使用tab */
		'indent': [
			'error',
			'tab'
		],
		/* 行尾用Windows */
		'linebreak-style': [
			'error',
			'windows'
		],
		/* 字符串用单引号 */
		'quotes': [
			'error',
			'single'
		],
		/* 必须有分号 */
		'semi': [
			'error',
			'always'
		],
		'keyword-spacing': [1, 'always'], // 关闭关键字后面是否要空一格
		'no-console': process.env.NODE_ENV === 'production' ? 1 : 0, // 开发可用console和debugger，生产不可用
		'no-debugger': process.env.NODE_ENV === 'production' ? 1 : 0,
		'no-useless-escape': 0, // 特殊字符可以使用
		'no-multiple-empty-lines': 'error', // 禁止空行
		'no-class-assign': 2, // 禁止给类赋值
		'no-const-assign': 2, // 禁止修改const声明的变量
		'no-dupe-keys': 2, // 在创建对象字面量时不允许键重复 {a:1,a:1}
		'no-var': 1, // 禁用var，用let和const代替
		camelcase: 1, // 强制驼峰法命名
		'vue/multi-word-component-names': [1, {}], // 组件名不能是单个单词
		"space-before-blocks": [0, "always"],//不以新行开始的块{前面要不要有空格
		"space-before-function-paren": [0, "always"],//函数定义时括号前面要不要有空格
		"space-in-parens": [0, "never"],//小括号里面要不要有空格
		"space-infix-ops": 0,//中缀操作符周围要不要有空格
		"space-return-throw-case": 2,//return throw case后面要不要加空格
	}
};
