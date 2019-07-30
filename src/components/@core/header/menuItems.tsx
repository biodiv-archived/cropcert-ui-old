import React, { Component } from "react";
import {
  Header,
  HeaderContainer,
  HeaderMenu,
  HeaderMenuButton,
  HeaderMenuItem,
  HeaderName,
  HeaderNavigation,
  HeaderSideNavItems,
  SideNav,
  SideNavItems,
  SkipToContent,
} from "carbon-components-react/lib/components/UIShell";
import { hasAccess, getRedirect } from "/@utils/auth";
import { ROLES } from "/@utils/constants";

interface IProps {
  pages;
}

export default class MenuItems extends Component<IProps> {
  OptionsList = options => {
    return options.map(option =>
      option.hasOwnProperty("children") ? (
        <HeaderMenu
          key={option.id}
          aria-label={option.title}
          href={`/pageview/${option.id}`}
          menuLinkName={option.title}
        >
          {this.OptionsList(option.children)}
        </HeaderMenu>
      ) : (
        <HeaderMenuItem key={option.id} href={`/pageview/${option.id}`}>
          {option.title}
        </HeaderMenuItem>
      )
    );
  };

  render() {
    return (
      <>
        {hasAccess([ROLES.AUTHORIZED]) && (
          <HeaderMenuItem href={getRedirect()}>My Dashboard</HeaderMenuItem>
        )}
        {hasAccess([ROLES.COLLECTION_CENTER]) && (
          <HeaderMenuItem href="/collection-center/list">
            Collection Centers
          </HeaderMenuItem>
        )}
        {this.OptionsList(this.props.pages)}
      </>
    );
  }
}
