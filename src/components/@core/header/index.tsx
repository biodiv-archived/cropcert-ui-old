import "./header.component.scss";

import {
  Header,
  HeaderGlobalBar,
  HeaderNavigation,
} from "carbon-components-react/lib/components/UIShell";
import { If } from "control-statements";
import { Link } from "gatsby";
import React, { Component } from "react";
import { Home, Info, LogOut, LogIn } from "react-feather";

import { AuthStore } from "/@stores/auth.store";
import { getRedirect, hasAccess } from "/@utils/auth";
import { CAS_AUTH_URL, ROLES } from "/@utils/constants";

interface IProps {
  siteTitle;
  roles: string[];
}

interface IState {
  isOpen;
}

export default class HeaderComponent extends Component<IProps, IState> {
  authStore = new AuthStore();
  render() {
    return (
      <Header
        sitetitle={this.props.siteTitle}
        aria-label={this.props.siteTitle}
      >
        <Link className="bx--header__name" to="/">
          {this.props.siteTitle}
        </Link>
        <If condition={hasAccess([ROLES.AUTHORIZED])}>
          <HeaderNavigation aria-label={this.props.siteTitle}>
            <Link
              className="bx--header__menu-item"
              role="menuitem"
              to={getRedirect()}
            >
              <Home className="eco--dash-icon" size={16} />
              Dashboard
            </Link>
          </HeaderNavigation>
        </If>
        <HeaderGlobalBar>
          <a
            className="bx--header__menu-item"
            role="menuitem"
            href="LICENSES.txt"
          >
            <Info className="eco--dash-icon" size={16} />
            Licenses
          </a>
          <If condition={hasAccess([ROLES.AUTHORIZED])}>
            <Link
              className="bx--header__menu-item"
              role="menuitem"
              to="/auth/sign-out"
            >
              {this.authStore.user.userName}
              &emsp;
              <LogOut className="eco--dash-icon" size={16} />
            </Link>
          </If>
          <If condition={!hasAccess([ROLES.AUTHORIZED])}>
            <a
              className="bx--header__menu-item"
              role="menuitem"
              href={CAS_AUTH_URL}
            >
              <LogIn className="eco--dash-icon" size={16} />
              Sign In
            </a>
          </If>
        </HeaderGlobalBar>
      </Header>
    );
  }
}
