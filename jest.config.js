// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  transform: {
    "^.+\\.js$": "babel-jest",
    "^.+\\.svelte$": "svelte-jester"
  },
  /* This is not working, does not fix problem when try to run tests.
   * Corresponding change attempted in package.json:

    "test": "NODE_OPTIONS=--experimental-vm-modules jest src",
   *
  transformIgnorePatterns: [
    "<rootDir>/node_modules/(?!(zingchart|zingchart-constants)/)"
  ],
   */
  moduleFileExtensions: [
    'js',
    'svelte'
  ],
  setupFilesAfterEnv: [
    '@testing-library/jest-dom/extend-expect'
  ]
};
