/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */
import { I18nProvider } from "@lingui/react";
import React from "react";
import Notifications from "react-notify-toast";

import { catalogs, langFromPath } from "./src/i18n-config";


export const wrapPageElement = ({ element, props }) => {
  const lang = langFromPath(props.location.pathname);
  return (
    <I18nProvider language={lang} catalogs={catalogs}>
      <Notifications />
      {element}
    </I18nProvider>
  );
};
