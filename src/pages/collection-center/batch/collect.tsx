import { If } from "control-statements";
import { observer } from "mobx-react";
import React, { Component } from "react";

import Layout from "/@components/@core/layout.component";
import SEO from "/@components/@core/seo.component";
import BatchCollect from "/@components/collection-center/batch/collect/batch-collect";
import { CCStore } from "/@stores/cc.store";
import { ROLES } from "/@utils/constants";

@observer
export default class CollectionCollectPage extends Component {
  ccStore = new CCStore();

  componentDidMount() {
    this.ccStore.listAccessibleCCs();
  }

  render() {
    return (
      <Layout roles={[ROLES.COLLECTION_CENTER, ROLES.FACTORY]}>
        <SEO title="Collect Collection" />
        <h1 className="eco--title">Collect Batch</h1>
        <If condition={this.ccStore.accessibleCCs.length > 0}>
          <BatchCollect accessibleCCs={this.ccStore.accessibleCCs} />
        </If>
        <If condition={this.ccStore.accessibleCCs.length === 0}>Loading...</If>
      </Layout>
    );
  }
}
