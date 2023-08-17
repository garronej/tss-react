declare const jest: any;
declare const mocha: any;
declare const __vitest_worker__: any;

export const isSSR = (() => {
    const isBrowser =
        typeof document === "object" &&
        typeof document?.getElementById === "function";

    // Check for common testing framework global variables
    const isJest = typeof jest !== "undefined";
    const isMocha = typeof mocha !== "undefined";
    const isVitest = typeof __vitest_worker__ !== "undefined";

    return !isBrowser && !isJest && !isMocha && !isVitest;
})();
