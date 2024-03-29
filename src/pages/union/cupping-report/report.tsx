import { observer } from "mobx-react";
import { parse } from "query-string";
import React, { Component } from "react";

import Layout from "/@components/@core/layout.component";
import SEO from "/@components/@core/seo.component";
import CuppingComponent from "/@components/union/lot/cupping";
import { getCurrentUser } from "/@utils/auth";
import { ROLES } from "/@utils/constants";
import { LotStore } from "/@stores/lot.store";
import { toJS } from "mobx";

interface IState {
  lotId;
  lotInfo;
}

@observer
export default class CuppingList extends Component<{}, IState> {
  isCSR = typeof location !== "undefined";
  lotStore = new LotStore();

  constructor(props) {
    super(props);
    const _cu = getCurrentUser() || {};
    this.state = {
      lotId: this.isCSR ? parse(location.search).id : 0,
      lotInfo: {
        cupper: _cu.hasOwnProperty("userName") || "NA",
      },
    };
  }

  componentWillMount() {
    this.lotStore.getLotById(this.state.lotId);
    this.lotStore.getOriginByLotId(this.state.lotId);
  }

  render() {
    return (
      <Layout roles={[ROLES.UNION]}>
        <SEO title={`Quality Report - Lot#${this.state.lotId}`} />
        <h1 className="eco--title">Cupping</h1>
        {this.lotStore.lotsBatch.has(this.state.lotId) &&
          this.lotStore.lotsOrigins.has(this.state.lotId) && (
            <CuppingComponent
              {...this.state}
              {...toJS(this.lotStore.lotsOrigins.get(this.state.lotId))}
              {...this.lotStore.lotsBatch.get(this.state.lotId)}
            />
          )}
      </Layout>
    );
  }
}
