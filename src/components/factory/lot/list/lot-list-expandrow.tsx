import { DataTable } from "carbon-components-react";
import { Observer, useObservable } from "mobx-react-lite";
import React, { useEffect } from "react";

const { TableExpandedRow } = DataTable;

export default function ExpandRow({ colSpan, lotId, lotStore }) {
  const ls = useObservable(lotStore);
  useEffect(() => {
    ls.getLotById(lotId);
  }, []);

  return (
    <Observer>
      {() => (
        <TableExpandedRow colSpan={colSpan}>
          {!ls.lotsBatch.has(lotId) ? (
            <>Loading...</>
          ) : (
            <pre>{JSON.stringify(ls.lotsBatch.get(lotId), null, 2)}</pre>
          )}
        </TableExpandedRow>
      )}
    </Observer>
  );
}
