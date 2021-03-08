import { JSX } from "preact";
import { Inputs, useCallback } from "preact/hooks";

import { Handler } from "../types";

export default function useOnKey <Target extends EventTarget, Params extends any[]> (
  key: string,
  callback: Handler<Target, JSX.TargetedKeyboardEvent<Target>, Params>,
  inputs?: Inputs
): Handler<Target, JSX.TargetedKeyboardEvent<Target>, Params> {
  return useCallback((event, ...rest) => {
    if (event.key === key) {
      event.preventDefault();
      callback.call(event.target, event, ...rest);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...(inputs ?? []), callback, key]);
}
