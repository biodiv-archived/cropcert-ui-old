import { Observer, useObservable } from "mobx-react-lite";
import { parse } from "query-string";
import React, { useEffect, useState } from "react";

import Layout from "/@components/@core/layout.component";
import SEO from "/@components/@core/seo.component";
import ManagePage from "/@components/pages/manage";
import { PagesStore } from "/@stores/pages.store";
import { ROLES } from "/@utils/constants";

export default function CreatePage() {
  const pagesStore = useObservable(new PagesStore());
  const isCSR = typeof location !== "undefined" ? true : false;
  const id = isCSR
    ? parse(location.search).id || parse(location.search).parentId
    : -1;
  const mode = isCSR ? parse(location.search).mode : -1;

  useEffect(() => {
    if (mode === "edit") {
      pagesStore.getPageById(id);
    }
  }, []);

  return (
    <Layout roles={[ROLES.AUTHORIZED]}>
      <SEO title="Manage Page" />
      <h1 className="eco--title">Manage Page</h1>
      <Observer>
        {() => (
          <ManagePage
            id={id}
            mode={mode}
            pagesStore={pagesStore}
            singlePage={pagesStore.singlePage}
          />
        )}
      </Observer>
    </Layout>
  );
}
