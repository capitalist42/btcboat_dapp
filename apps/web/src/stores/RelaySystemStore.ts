import { Subject } from "rxjs";

export interface RelaySystemStoreState {
  allowedTokens: string[]; // allowed ERC20 tokens to be used for gas fee payment
}

const subject = new Subject();

const initialState: RelaySystemStoreState = {
  allowedTokens: [],
};

let state = initialState;

export const relaySystemStore = {
  init: () => subject.next(state),
  initialState: initialState,
  subscribe: (setState: (value: unknown) => void) =>
    subject.subscribe(setState),
};
