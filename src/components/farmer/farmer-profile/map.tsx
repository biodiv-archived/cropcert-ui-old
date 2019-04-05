import { If } from "control-statements";
import { Link } from "gatsby";
import L from "leaflet";
import React from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";

import { MAP } from "/@utils/constants";

export default function FarmerProfileMap({ farmerCC }) {
  delete L.Icon.Default.prototype["_getIconUrl"];
  L.Icon.Default.mergeOptions(MAP.MARKER_MERGEOPTIONS);

  return (
    <If condition={window && !!farmerCC.latitude}>
      <div className="bx--col-lg-12">
        <Map
          center={[farmerCC.latitude, farmerCC.longitude]}
          zoom={9}
          scrollWheelZoom={false}
        >
          <TileLayer attribution={MAP.TILE.ATTRIBUTION} url={MAP.TILE.URL} />
          <Marker position={[farmerCC.latitude, farmerCC.longitude]}>
            <Popup>
              <Link to={`/collection-center/view?ccId=${farmerCC.ccId}`}>
                More on {farmerCC.ccName} Collection Center &rarr;
              </Link>
            </Popup>
          </Marker>
        </Map>
      </div>
    </If>
  );
}
