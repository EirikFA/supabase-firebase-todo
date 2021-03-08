import { JSX } from "preact";
import { StateUpdater, useCallback, useState } from "preact/hooks";

const useInput = <Target extends EventTarget>(): [
  string,
  JSX.GenericEventHandler<Target>,
  StateUpdater<string>
] => {
  const [value, setValue] = useState("");

  const onInput: JSX.GenericEventHandler<Target> = useCallback(event => {
    setValue((event.target as any).value);
  }, []);

  return [value, onInput, setValue];
};

export default useInput;
