import React, { useEffect } from "react";

import Layout from "/@components/@core/layout.component";
import SEO from "/@components/@core/seo.component";
import { ROLES } from "/@utils/constants";
import PageList from "/@components/pages/list";
import { PagesStore } from "/@stores/pages.store";
import { Observer, useObservable } from "mobx-react-lite";

export default function ListPage() {
  const ps = useObservable(new PagesStore());

  useEffect(() => {
    ps.getAllPages();
  }, []);

  return (
    <Layout roles={[ROLES.AUTHORIZED]}>
      <SEO title="Pages List" />
      <Observer>{() => <PageList pagesStore={ps} pages={ps.pages} />}</Observer>
    </Layout>
  );
}
