/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const { languages, defaultLanguage } = require("./src/i18n-config");
const path = require("path");

exports.onCreateWebpackConfig = function({ stage, actions, loaders }) {
  let customModules = {};

  if (stage === "build-javascript") {
    // Turn off source maps
    actions.setWebpackConfig({
      devtool: false,
    });
  }

  if (stage === "build-html") {
    customModules = {
      module: {
        rules: [
          {
            test: /ckeditor/,
            use: loaders.null(),
          },
        ],
      },
    };
  }

  actions.setWebpackConfig({
    resolve: {
      alias: {
        "/@components": path.resolve(__dirname, "./src/components"),
        "/@stores": path.resolve(__dirname, "./src/stores"),
        "/@pages": path.resolve(__dirname, "./src/pages"),
        "/@styles": path.resolve(__dirname, "./src/styles"),
        "/@utils": path.resolve(__dirname, "./src/utils"),
      },
    },
    ...customModules,
  });
};

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage, deletePage } = actions;

  return new Promise((resolve, reject) => {
    deletePage(page);
    languages.map(language => {
      const newPage = Object.assign({}, page, {
        originalPath: page.path,
        path: "/" + language + page.path,
        context: {
          lang: language,
        },
      });

      createPage(newPage);
      if (language === defaultLanguage) {
        newPage.path = page.path;
        createPage(newPage);
      }
    });

    resolve();
  });
};
