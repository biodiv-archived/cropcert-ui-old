import { graphql, StaticQuery } from "gatsby";
import React, { PureComponent } from "react";
import Helmet from "react-helmet";

interface IProps {
  description?;
  title;
}

class Seo extends PureComponent<IProps> {
  renderSeo = data => {
    const metaDescription =
      this.props.description || data.site.siteMetadata.description;
    return (
      <Helmet
        htmlAttributes={{
          lang: `en`,
        }}
        title={this.props.title}
        titleTemplate={`%s | ${data.site.siteMetadata.title}`}
        meta={[
          {
            name: `description`,
            content: metaDescription,
          },
          {
            property: `og:title`,
            content: this.props.title,
          },
          {
            property: `og:description`,
            content: metaDescription,
          },
          {
            property: `og:type`,
            content: `website`,
          },
          {
            name: `twitter:card`,
            content: `summary`,
          },
          {
            name: `twitter:creator`,
            content: data.site.siteMetadata.author,
          },
          {
            name: `twitter:title`,
            content: this.props.title,
          },
          {
            name: `twitter:description`,
            content: metaDescription,
          },
        ]}
      />
    );
  };

  render() {
    return <StaticQuery query={detailsQuery} render={this.renderSeo} />;
  }
}

const detailsQuery = graphql`
  query DefaultSEOQuery {
    site {
      siteMetadata {
        title
        description
        author
      }
    }
  }
`;

export default Seo;
