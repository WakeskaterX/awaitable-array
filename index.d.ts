/**
 * These are the types for the Awaitable Array
 */
export = class AwaitableArray extends Array {
  untilLength(length: number, padding?: number, timeout?: number): Promise<void>;
  untilCondition(condition: () => {}, padding?: number, timeout?: number): Promise<void>;
}
