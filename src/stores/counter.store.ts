import { action, observable } from "mobx";

/*
 * Sample counter store for reference purposes
 */
export class CounterStore {
  @observable count: number = 0;

  @action
  increment() {
    this.count++;
  }

  @action
  decrement() {
    this.count--;
  }
}
