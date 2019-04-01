import "/@styles/_theme.scss";
import "/@styles/global.scss";

import { If } from "control-statements";
import { graphql, navigate, StaticQuery } from "gatsby";
import * as React from "react";

import Header from "./header";
import { hasAccess } from "/@utils/auth";

interface IProps {
  children;
  roles: string[];
}

export default class Layout extends React.PureComponent<IProps> {
  isAllowed = hasAccess(this.props.roles);

  componentDidMount() {
    if (!this.isAllowed) {
      navigate("/401");
    }
  }

  renderLayout = data => {
    return (
      <If condition={this.isAllowed}>
        <Header roles={this.props.roles} siteTitle={data.site.siteMetadata.title} />
        <div className="bx--grid eco--grid">{this.props.children}</div>
      </If>
    );
  };

  render() {
    return (
      <StaticQuery
        query={graphql`
          query SiteTitleQuery {
            site {
              siteMetadata {
                title
              }
            }
          }
        `}
        render={this.renderLayout}
      />
    );
  }
}