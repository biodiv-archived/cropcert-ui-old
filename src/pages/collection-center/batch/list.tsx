import { If } from "control-statements";
import { toJS } from "mobx";
import { observer } from "mobx-react";
import React, { Component } from "react";

import Layout from "/@components/@core/layout.component";
import SEO from "/@components/@core/seo.component";
import BatchListComponent from "/@components/collection-center/batch/list/batch-list";
import { CCStore } from "/@stores/cc.store";
import { ROLES } from "/@utils/constants";

@observer
export default class BatchListPage extends Component {
  ccStore = new CCStore();

  componentDidMount() {
    this.ccStore.listAccessibleCCs();
  }

  render() {
    return (
      <Layout roles={[ROLES.AUTHORIZED]}>
        <SEO title="Batch List" />
        <If condition={this.ccStore.accessibleCCs.length > 0}>
          <BatchListComponent
            accessibleCCs={toJS(this.ccStore.accessibleCCs)}
          />
        </If>
      </Layout>
    );
  }
}
