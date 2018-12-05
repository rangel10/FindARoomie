module.exports = {
    "env": {
        "browser": true
    },
    "parser": "babel-eslint",
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"],
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "rules": {
        "indent": [
            "error",
            2
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-console": 0
    }
  };