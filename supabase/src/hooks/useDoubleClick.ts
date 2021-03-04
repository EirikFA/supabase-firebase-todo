import { JSX } from "preact";

import { Handler } from "../types";

export default function useDoubleClick <Target extends EventTarget, Params extends any[]> (
  callback: Handler<Target, JSX.TargetedMouseEvent<Target>, Params>
): Handler<Target, JSX.TargetedMouseEvent<Target>, Params> {
  let clicks: number[] = [];
  let timeout: number | undefined;

  return (event, ...rest) => {
    clicks.push(new Date().getTime());

    clearTimeout(timeout);
    timeout = window.setTimeout(() => {
      if (clicks.length > 1) callback.call(event.target, event, ...rest);

      clicks = [];
    }, 250);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  };
}
