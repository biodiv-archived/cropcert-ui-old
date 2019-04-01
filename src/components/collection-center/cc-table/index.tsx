import "./cc-table.component.scss";

import { If } from "control-statements";
import L from "leaflet";
import { observer } from "mobx-react";
import React, { Component } from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";

import TableSub from "./table-sub";
import { CCStore } from "/@stores/cc.store";

@observer
export default class CCTableComponent extends Component {
  ccstore = new CCStore();
  position: [number, number] = [0.4363, 30.1675];

  componentDidMount = () => {
    delete L.Icon.Default.prototype["_getIconUrl"];
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "/assets/marker-default@2x.png",
      iconUrl: "/assets/marker-default.png",
      iconSize: [30, 70],
      shadowSize: [0, 0],
      shadowAnchor: [0, 0],
      popupAnchor: [3, -40],
    });
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
              <Map center={this.position} zoom={9}>
                <TileLayer
                  attribution={`&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors`}
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
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
