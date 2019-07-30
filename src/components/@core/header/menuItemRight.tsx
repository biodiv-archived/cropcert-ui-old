import Information20 from "@carbon/icons-react/es/information/20";
import LogIn from "@carbon/icons-react/es/login/20";
import LogOut from "@carbon/icons-react/es/logout/20";
import { HeaderGlobalBar } from "carbon-components-react/lib/components/UIShell";
import React from "react";

import { getCurrentUser, hasAccess } from "/@utils/auth";
import { CAS_AUTH_URL, ROLES } from "/@utils/constants";

export default function MenuItemRight() {
  return (
    <HeaderGlobalBar>
      <a href="LICENSES.txt" title="Licenses" className="bx--header__action">
        <Information20 />
      </a>
      {hasAccess([ROLES.AUTHORIZED]) ? (
        <a href="/auth/sign-out" className="bx--header__action">
          <span>{getCurrentUser().userName}</span>
          <LogOut />
        </a>
      ) : (
        <a href={CAS_AUTH_URL} className="bx--header__action">
          <span>Sign In</span>
          <LogIn />
        </a>
      )}
    </HeaderGlobalBar>
  );
}
