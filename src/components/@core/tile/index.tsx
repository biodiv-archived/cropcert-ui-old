import "./tile.component.scss";

import { Link } from "gatsby";
import React from "react";
import { getRedirect } from "/@utils/auth";

interface IProps {
  title: string;
  description: string;
  to: string;
  relative: boolean;
}

function DashListComponent(props: IProps) {
  return (
    <div className="bx--col-lg-3 bx--col-sm-12 eco--spacing-bottom">
      <Link
        className="bx--tile eco--card"
        to={props.relative ? getRedirect() + "/" + props.to : props.to}
      >
        <h2>{props.title}</h2>
        <p>{props.description} &rarr;</p>
      </Link>
    </div>
  );
}

DashListComponent.defaultProps = {
  relative: true,
};

export default DashListComponent;
