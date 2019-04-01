var flat = require("flat");

const languages = ["en", "fr"];
const catalogs = {
  en: {
    messages: flat(require("./locales/en/messages.json")),
  },
  fr: {
    messages: flat(require("./locales/fr/messages.json")),
  },
};

const defaultLanguage = "en";

const prefix = lang => (lang === defaultLanguage ? "/" : "/" + lang);
const deprefix = pathname =>
  pathname.startsWith("/en/") ? pathname.substr(4) : pathname;
const langFromPath = pathname => (pathname.startsWith("/fr/") ? "fr" : "en");

exports.defaultLanguage = defaultLanguage;
exports.languages = languages;
exports.catalogs = catalogs;
exports.prefix = prefix;
exports.deprefix = deprefix;
exports.langFromPath = langFromPath;
