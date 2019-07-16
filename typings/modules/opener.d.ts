// Type definitions for opener 1.4
// Project: https://github.com/domenic/opener
// Definitions by: Rahul Ravikumar <https://github.com/tikurahul>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/// <reference types='node' />

declare module "opener" {
  import { ChildProcess } from "child_process";
  type Callback = (error: Error, stdout: string, stderr: string) => void;
  export default function(args: string | string[], options?: {}, callback?: Callback): ChildProcess;
}
