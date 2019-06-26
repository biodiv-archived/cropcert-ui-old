import { observer } from "mobx-react";
import { parse } from "query-string";
import React, { Component } from "react";

import Layout from "/@components/@core/layout.component";
import SEO from "/@components/@core/seo.component";
import QAComponent from "/@components/cooperative/lot/qa";
import { ROLES } from "/@utils/constants";

interface IState {
  lotId;
  lotInfo;
}

@observer
export default class QuantitativeAnalysisPage extends Component<{}, IState> {
  isCSR = typeof location !== "undefined";

  constructor(props) {
    super(props);
    this.state = {
      lotId: this.isCSR ? parse(location.search).lotId : 0,
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
        },
      });
    }, 100);
  }

  render() {
    return (
      <Layout roles={[ROLES.COOPERATIVE]}>
        <SEO title={`Green Analysis - Lot#${this.state.lotId}`} />
        <h1 className="eco--title">Green Analysis</h1>
        {this.state.lotInfo !== null && <QAComponent {...this.state} />}
      </Layout>
    );
  }
}
