import DevTools from "mobx-react-devtools";
import React from "react";

import Counter from "../components/counter.component";
import { CounterStore } from "../stores/counter.store";

export default () => (
  <>
    <DevTools />
    <Counter store={new CounterStore()} />
  </>
);
