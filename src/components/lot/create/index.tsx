import ListIcon from "@carbon/icons-react/es/list/20";
import SettingsIcon from "@carbon/icons-react/es/settings/20";
import { window } from "browser-monads";
import { Button, DataTable } from "carbon-components-react";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import {
  FieldControl,
  FieldGroup,
  FormBuilder,
  Validators,
} from "react-reactive-form";

import {
  FIELDS_DRY,
  FIELDS_WET,
} from "../../collection-center/batch/list/header.constants";
import { textInput as textInput1 } from "/@components/@core/form";
import { LotStore } from "/@stores/lot.store";
import { getToday, toFriendlyCellValue } from "/@utils/basic";
import { getCurrentUser } from "/@utils/auth";
import * as Yup from "yup";
import { selectInput, textInput } from "/@components/@core/formik";
import { Formik, Field } from "formik";

const {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableHeader,
} = DataTable;

export default function index() {
  const lotStore = new LotStore();
  const [quantity, setQuantity] = useState(0);
  const [rows, setRows] = useState([] as any);
  const [lotType, setLotType] = useState();
  const [batchIds, setBatchIds] = useState([] as any);
  const [isFirstStep, setIsFirstStep] = useState([] as any);
  const [lotFormInitial, setLotFormInitial] = useState([] as any);

  useEffect(() => {
    const params = window.history.state || {};
    const batches = params.selectedRows || [];
    const lotType = params.lotType || "";

    let quantity = 0;
    let batchIds: number[] = [];

    const _batchesRows = batches.map(c => {
      quantity += c.cells[c.cells.length - 1].value;
      batchIds.push(parseInt(`${c.id}`));
      return c.cells.reduce(
        (acc, c) => ({ ...acc, [c.info.header]: c.value }),
        {}
      );
    });

    setQuantity(quantity);
    setBatchIds(batchIds);
    setRows(_batchesRows);
    setLotType(lotType);
    setIsFirstStep(params.isWetBatchFirstStep);

    setLotFormInitial({
      date: getToday(),
      lotName: `${params.ccName}_Lot_${getToday()}`,
      batchIds: batches.map(b => parseInt(b.id)),
      quantity,
      coCode: getCurrentUser()["coCode"],
      type: lotType,
    });
  }, [window.history.state]);

  const handleFirstStep = () => {
    lotStore.finalizeWetBatches(batchIds);
  };

  const handleSubmit = (values, actions) => {
    const { date, ...v } = values;
    actions.setSubmitting(false);
    lotStore.createLotfromBatches({
      ...v,
      createdOn: new Date().getTime(),
      timeToFactory: new Date().getTime(),
    });
  };

  return (
    <>
      <div className="bx--row">
        <div className="bx--col-lg-6 bx--col-md-12">
          <h1 className="eco--title">
            {isFirstStep ? "Finalize Wetbatch" : "Create Lot"}
          </h1>
        </div>
        {isFirstStep && (
          <div className="bx--col-lg-6 bx--col-md-12 text-right">
            <Button
              kind="primary"
              className="eco--button-table-primary"
              onClick={handleFirstStep}
            >
              Confirm Finalize Wetbatch
            </Button>
          </div>
        )}
      </div>

      {rows.length > 0 && (
        <Formik
          initialValues={lotFormInitial}
          enableReinitialize
          onSubmit={handleSubmit}
          render={({ handleSubmit }) => (
            <form className="bx--form" onSubmit={handleSubmit}>
              <div className="bx--row">
                <div
                  className={`bx--col-md-12 ${
                    isFirstStep ? "bx--col-lg-12" : "bx--col-lg-8"
                  }`}
                >
                  <h2 className="eco--form-title">
                    <ListIcon />
                    &ensp;{rows.length} Batches(s)
                  </h2>
                  <DataTable
                    rows={rows}
                    headers={lotType == "DRY" ? FIELDS_DRY : FIELDS_WET}
                    render={({ rows, headers, getHeaderProps }) => (
                      <TableContainer>
                        <Table>
                          <TableHead>
                            <TableRow>
                              {headers.map(header => (
                                <TableHeader {...getHeaderProps({ header })}>
                                  {header.header}
                                </TableHeader>
                              ))}
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {rows.map(row => (
                              <TableRow key={row.id}>
                                {row.cells.map(cell => (
                                  <TableCell key={cell.id}>
                                    {toFriendlyCellValue(cell)}
                                  </TableCell>
                                ))}
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    )}
                  />
                </div>
                {!isFirstStep && (
                  <div className="bx--col-lg-4 bx--col-md-12">
                    <h2 className="eco--form-title">
                      <SettingsIcon />
                      &ensp;Lot Info
                    </h2>
                    <Field
                      label="Lot Name"
                      name="lotName"
                      component={textInput}
                      readOnly={true}
                    />
                    <Field
                      label="Date"
                      name="date"
                      component={textInput}
                      readOnly={true}
                    />
                    <Field
                      label="Batch Type"
                      name="type"
                      component={textInput}
                      readOnly={true}
                    />
                    <div className="bx--row">
                      <div className="bx--col-lg-5 bx--col-md-12 eco--form-total">
                        {quantity}
                        KG
                      </div>
                      <div className="bx--col-lg-7 bx--col-md-12 eco--form-submit">
                        <Button type="submit">Create Lot</Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </form>
          )}
        />
      )}
    </>
  );
}
