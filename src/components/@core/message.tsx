import React from "react";
import { InlineNotification } from "carbon-components-react";
import { getRedirect } from "/@utils/auth";
import { Link } from "gatsby";

export default function MessageComponent({
  type = "error",
  message,
  id,
  backLink,
  backLinkTitle,
}: any) {
  const getMessage = () => {
    return type === "success"
      ? id > 0
        ? `${message} #${id}`
        : message
      : "There was some error while performing this operation please try again";
  };

  return (
    <>
      <br />
      <InlineNotification
        kind={type}
        lowContrast
        title={type}
        subtitle={getMessage()}
      />
      <Link
        to={getRedirect()}
        className="btn btn-primary btn-lg btn-block bx--btn bx--btn--primary"
      >
        Go to Dashboard
      </Link>
      <Link
        to={backLink}
        className="btn btn-primary btn-lg btn-block bx--btn bx--btn--primary ml-2"
      >
        {backLinkTitle}
      </Link>
    </>
  );
}
