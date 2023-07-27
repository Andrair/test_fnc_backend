module.exports = {
	env: {
		commonjs: true,
		es2021: true,
	},
	extends: ["standard", "eslint-config-prettier"],
	overrides: [
		{
			env: {
				node: true,
			},
			files: [".eslintrc.{js,cjs}"],
			parserOptions: {
				sourceType: "script",
			},
		},
	],
	parserOptions: {
		ecmaVersion: "latest",
	},
	rules: {
		"padding-line-between-statements": [
			"error",
			{ blankLine: "always", prev: ["const", "let", "var"], next: "*" },
			{ blankLine: "any", prev: ["const", "let", "var"], next: ["const", "let", "var"] },
		],
	},
};
