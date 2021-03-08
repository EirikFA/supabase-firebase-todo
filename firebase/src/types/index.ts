import { JSX } from "preact";

export * from "./Todo";

export type Handler<
  Target extends EventTarget,
  Event extends JSX.TargetedEvent<Target>,
  Params extends any[]
> = {
  (event: Event, ...rest: Params): void
};
