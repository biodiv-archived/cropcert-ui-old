import React from "react";
import { Link } from "gatsby";

export default function FarmerProfileDataTable({ farmer }) {
  return (
    <>
      <div className="bx--col-lg-6">
        <table className="bx--data-table-v2">
          <thead>
            <tr>
              <th colSpan={2}>Personal Details</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Birthdate</td>
              <td>{farmer.dateOfBirth || "NA"}</td>
            </tr>
            <tr>
              <td>Gender</td>
              <td>{farmer.gender === "m" ? "Male" : "Female"}</td>
            </tr>
            <tr>
              <td>Cell Number</td>
              <td>{farmer.cellNumber || "NA"}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{farmer.email || "NA"}</td>
            </tr>
            <tr>
              <td>Village & Sub Country</td>
              <td>
                {farmer.village || "NA"},{farmer.subCountry || "NA"}
              </td>
            </tr>
            <tr>
              <td>MembershipId</td>
              <td>{farmer.membershipId || "NA"}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="bx--col-lg-6">
        <table className="bx--data-table-v2">
          <thead>
            <tr>
              <th colSpan={2}>Farm Details</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Farm Number & Code</td>
              <td>
                {farmer.farmCode || "NA"},{farmer.farmNumber || "NA"}
              </td>
            </tr>
            <tr>
              <td>Collection Center</td>
              <td>
                <Link to={`/collection-center/view?ccId=${farmer.ccCode}`}>
                  {farmer.ccCode}
                </Link>
              </td>
            </tr>
            <tr>
              <td>Number of Plots</td>
              <td>{farmer.numOfPlots || "NA"}</td>
            </tr>
            <tr>
              <td>Number of CoffeeTrees</td>
              <td>{farmer.numOfCoffeeTrees || "NA"}</td>
            </tr>
            <tr>
              <td>Area Under Coffee</td>
              <td>{farmer.areaUnderCoffee || "NA"}</td>
            </tr>
            <tr>
              <td>Total Area</td>
              <td>{farmer.totalArea || "NA"}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
