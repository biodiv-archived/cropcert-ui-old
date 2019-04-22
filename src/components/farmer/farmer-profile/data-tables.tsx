import { DataTable } from "carbon-components-react";
import { Link } from "gatsby";
import React from "react";

const {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableHeader,
} = DataTable;

export default function FarmerProfileDataTable({ farmer }) {
  return (
    <>
      <div className="bx--col-lg-6">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader colSpan={2}>Personal Details</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Birthdate</TableCell>
              <TableCell>{farmer.dateOfBirth || "NA"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Gender</TableCell>
              <TableCell>{farmer.gender === "m" ? "Male" : "Female"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Cell Number</TableCell>
              <TableCell>{farmer.cellNumber || "NA"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>{farmer.email || "NA"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Village & Sub Country</TableCell>
              <TableCell>
                {farmer.village || "NA"},{farmer.subCountry || "NA"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>MembershipId</TableCell>
              <TableCell>{farmer.membershipId || "NA"}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div className="bx--col-lg-6">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader colSpan={2}>Farm Details</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Farm Number & Code</TableCell>
              <TableCell>
                {farmer.farmCode || "NA"},{farmer.farmNumber || "NA"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Collection Center</TableCell>
              <TableCell>
                <Link to={`/collection-center/view?ccId=${farmer.ccCode}`}>
                  {farmer.ccCode}
                </Link>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Number of Plots</TableCell>
              <TableCell>{farmer.numOfPlots || "NA"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Number of CoffeeTrees</TableCell>
              <TableCell>{farmer.numOfCoffeeTrees || "NA"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Area Under Coffee</TableCell>
              <TableCell>{farmer.areaUnderCoffee || "NA"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Total Area</TableCell>
              <TableCell>{farmer.totalArea || "NA"}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </>
  );
}
