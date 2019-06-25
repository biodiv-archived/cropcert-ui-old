import { observer } from "mobx-react";
import { parse } from "query-string";
import React, { Component } from "react";

import Layout from "/@components/@core/layout.component";
import SEO from "/@components/@core/seo.component";
import CuppingComponent from "/@components/cooperative/lot/cupping";
import { getCurrentUser } from "/@utils/auth";
import { ROLES } from "/@utils/constants";

interface IState {
  lotId;
  lotInfo;
}

@observer
export default class CuppingList extends Component<{}, IState> {
  isCSR = typeof location !== "undefined";

  constructor(props) {
    super(props);
    this.state = {
      lotId: this.isCSR ? parse(location.search).lotId : 0,
      lotInfo: null,
    };
  }

  componentWillMount() {
    const _cu = getCurrentUser() || {};
    setTimeout(() => {
      this.setState({
        lotInfo: {
          cfa: "__CFA__",
          cc_code: 1,
          coffee_type: "WET",
          cupper: _cu.hasOwnProperty("userName") || "NA",
        },
      });
    }, 100);
  }

  render() {
    return (
      <Layout roles={[ROLES.COOPERATIVE]}>
        <SEO title={`Quality Report - Lot#${this.state.lotId}`} />
        <h1 className="eco--title">Cupping</h1>
        {this.state.lotInfo !== null && <CuppingComponent {...this.state} />}
      </Layout>
    );
  }
}
