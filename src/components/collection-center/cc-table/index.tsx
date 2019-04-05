import "./cc-table.component.scss";

import { If } from "control-statements";
import L from "leaflet";
import { observer } from "mobx-react";
import React, { Component } from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";

import TableSub from "./table-sub";
import { CCStore } from "/@stores/cc.store";
import { MAP } from "/@utils/constants";

@observer
export default class CCTableComponent extends Component {
  ccstore = new CCStore();

  componentDidMount = () => {
    delete L.Icon.Default.prototype["_getIconUrl"];
    L.Icon.Default.mergeOptions(MAP.MARKER_MERGEOPTIONS);
    this.ccstore.list(true);
  };

  render() {
    return (
      <If condition={this.ccstore.cc.length > 0}>
        <h1 className="eco--title">Collection Centers</h1>
        <div className="bx--row">
          <div className="bx--col-lg-6 bx--col-md-12">
            <TableSub resources={this.ccstore.cc} />
          </div>
          <div className="bx--col-lg-6 bx--col-md-12">
            <If condition={window}>
              <Map center={MAP.MAP_CENTER} zoom={9}>
                <TileLayer
                  attribution={MAP.TILE.ATTRIBUTION}
                  url={MAP.TILE.URL}
                />
                {this.ccstore.cc.map(cc => (
                  <Marker
                    key={cc["id"]}
                    position={[cc["latitude"], cc["longitude"]]}
                  >
                    <Popup>{`#${cc.coOperativeId} - ${cc.ccName} - ${
                      cc.village
                    }`}</Popup>
                  </Marker>
                ))}
              </Map>
            </If>
          </div>
        </div>
      </If>
    );
  }
}
