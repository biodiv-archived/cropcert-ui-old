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
  constructor(props) {
    super(props);
    this.state = {
      lotId: parse(location.search).lotId,
      lotInfo: null,
    };
  }

  componentWillMount() {
    // TODO: fetch lot info dynamically
    setTimeout(() => {
      this.setState({
        lotInfo: {
          cfa: "__CFA__",
          cc_code: 1,
          coffee_type: "WET",
          cupper: getCurrentUser()["userName"],
        },
      });
    }, 100);
  }

  render() {
    return (
      <Layout roles={[ROLES.COOPERATIVE]}>
        <SEO title={`Quality Report - Lot#${this.state.lotId}`} />
        <h1 className="eco--title">Quantitative Analysis</h1>
        {this.state.lotInfo !== null && <CuppingComponent {...this.state} />}
      </Layout>
    );
  }
}
