import React from "react";

export default function FarmerProfileSideBar({ farmer }) {
  return (
    <div className="bx--col-lg-2 bx--col-sm-12 eco--avatar">
      <img
        src={`https://ui-avatars.com/api/?name=${
          farmer.userName
        }&size=300&font-size=0.33`}
      />
      <div className="eco--avatar-title">
        {farmer.userName} <span>#{farmer.id}</span>
      </div>
    </div>
  );
}
