import { observer } from "mobx-react";
import { parse } from "query-string";
import React, { Component } from "react";

import Layout from "/@components/@core/layout.component";
import SEO from "/@components/@core/seo.component";
import GreenReport from "../../../components/union/lot/qa";
import { ROLES } from "/@utils/constants";
import { LotStore } from "/@stores/lot.store";
import { toJS } from "mobx";

interface IState {
  lotId;
  lotInfo;
}

@observer
export default class QuantitativeAnalysisPage extends Component<{}, IState> {
  isCSR = typeof location !== "undefined";

  lotStore = new LotStore();

  constructor(props) {
    super(props);
    this.state = {
      lotId: this.isCSR ? parse(location.search).id : 0,
      lotInfo: {
        cfa: "__CFA__",
        cc_code: 1,
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
        <SEO title={`Green Analysis - Lot#${this.state.lotId}`} />
        <h1 className="eco--title">Green Analysis</h1>
        {this.lotStore.lotsBatch.has(this.state.lotId) &&
          this.lotStore.lotsOrigins.has(this.state.lotId) && (
            <GreenReport
              {...this.state}
              {...toJS(this.lotStore.lotsOrigins.get(this.state.lotId))}
              {...toJS(this.lotStore.lotsBatch.get(this.state.lotId))}
            />
          )}
      </Layout>
    );
  }
}
