import "./header.component.scss";

import {
  Header,
  HeaderContainer,
  HeaderMenuButton,
  HeaderNavigation,
  HeaderSideNavItems,
  SideNav,
  SideNavItems,
  SkipToContent,
} from "carbon-components-react/lib/components/UIShell";
import { Link } from "gatsby";
import { observer } from "mobx-react";
import React, { Component } from "react";

import MenuItemRight from "./menuItemRight";
import MenuItems from "./menuItems";
import { PagesStore } from "/@stores/pages.store";

interface IProps {
  siteTitle;
  roles: string[];
}

@observer
export default class HeaderComponent extends Component<IProps> {
  pagesStore = new PagesStore();

  componentDidMount() {
    this.pagesStore.getAllPages();
  }

  render() {
    return (
      <HeaderContainer
        render={({ isSideNavExpanded, onClickSideNavExpand }) => (
          <>
            <Header aria-label={this.props.siteTitle}>
              <SkipToContent />
              <HeaderMenuButton
                aria-label="Open menu"
                onClick={onClickSideNavExpand}
                isActive={isSideNavExpanded}
              />
              <Link className="bx--header__name" to="/">
                {this.props.siteTitle}
              </Link>
              <HeaderNavigation aria-label={this.props.siteTitle}>
                <MenuItems pages={this.pagesStore.pages} />
              </HeaderNavigation>
              <SideNav
                aria-label="Side navigation"
                expanded={isSideNavExpanded}
                isPersistent={false}
              >
                <SideNavItems>
                  <HeaderSideNavItems>
                    <MenuItems pages={this.pagesStore.pages} />
                  </HeaderSideNavItems>
                </SideNavItems>
              </SideNav>
              <MenuItemRight />
            </Header>
          </>
        )}
      />
    );
  }
}
