import { DataTable } from "carbon-components-react";
import { If } from "control-statements";
import { Observer, useObservable } from "mobx-react-lite";
import React, { useEffect } from "react";

export default function ExpandRow({ colSpan, collectionId, collectionStore }) {
  const cs = useObservable(collectionStore);
  useEffect(() => {
    cs.getBatchInfoFromCollectionId(collectionId);
  }, []);

  return (
    <Observer>
      {() => (
        <DataTable.TableExpandedRow colSpan={colSpan}>
          <If condition={!!cs.collectionsBatch.has(collectionId)}>
            <>{JSON.stringify(cs.collectionsBatch.get(collectionId))}</>
          </If>
          <If condition={!cs.collectionsBatch.has(collectionId)}>Loading...</If>
        </DataTable.TableExpandedRow>
      )}
    </Observer>
  );
}
