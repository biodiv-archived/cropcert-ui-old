import { DataTable } from "carbon-components-react";
import { If } from "control-statements";
import { Observer, useObservable } from "mobx-react-lite";
import React, { useEffect } from "react";

export default function ExpandRow({ colSpan, batchId, batchingStore }) {
  const cs = useObservable(batchingStore);

  useEffect(() => {
    cs.getCollectionInfoFrombatchId(batchId);
  }, []);

  return (
    <Observer>
      {() => (
        <DataTable.TableExpandedRow colSpan={colSpan}>
          <If condition={!!cs.batchCollections.has(batchId)}>
            <>{JSON.stringify(cs.batchCollections.get(batchId))}</>
          </If>
          <If condition={!cs.batchCollections.has(batchId)}>Loading...</If>
        </DataTable.TableExpandedRow>
      )}
    </Observer>
  );
}
