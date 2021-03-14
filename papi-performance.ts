/**
 * Requires a module which is protected against bundler minification.
 *
 * @param request The module path to resolve
 */
export function dynamicRequire(mod: any, request: string): any {
    // tslint:disable-next-line: no-unsafe-any
    return mod.require(request);
}

/**
 * Checks whether we're in the Node.js or Browser environment
 *
 * @returns Answer to given question
 */
export function isNodeEnv(): boolean {
    // tslint:disable:strict-type-predicates
    return Object.prototype.toString.call(typeof process !== 'undefined' ? process : 0) === '[object process]';
}

const fallbackGlobalObject = {};

/**
 * Safely get global scope object
 *
 * @returns Global scope object
 */
export function getGlobalObject<T>(): T {
    return (isNodeEnv()
        ? global
        : typeof window !== 'undefined'
        ? window
        : typeof self !== 'undefined'
        ? self
        : fallbackGlobalObject) as T;
}
// tslint:enable:strict-type-predicates

const INITIAL_TIME = Date.now();
let prevNow = 0;

/**
 * Cross platform compatible partial performance implementation
 */
interface CrossPlatformPerformance {
    /**
     * Returns the current timestamp in ms
     */
    now(): number;
    timeOrigin: number;
}

const performanceFallback: CrossPlatformPerformance = {
    now(): number {
        let now = Date.now() - INITIAL_TIME;
        if (now < prevNow) {
            now = prevNow;
        }
        prevNow = now;
        return now;
    },
    timeOrigin: INITIAL_TIME,
};

export const crossPlatformPerformance: CrossPlatformPerformance = (() => {
    if (isNodeEnv()) {
        try {
            const perfHooks = dynamicRequire(module, 'perf_hooks') as { performance: CrossPlatformPerformance };
            return perfHooks.performance;
        } catch (_) {
            return performanceFallback;
        }
    }

    if (getGlobalObject<Window>().performance) {
        // Polyfill for performance.timeOrigin.
        //
        // While performance.timing.navigationStart is deprecated in favor of performance.timeOrigin, performance.timeOrigin
        // is not as widely supported. Namely, performance.timeOrigin is undefined in Safari as of writing.
        // tslint:disable-next-line:strict-type-predicates
        if (performance.timeOrigin === undefined) {
            // As of writing, performance.timing is not available in Web Workers in mainstream browsers, so it is not always a
            // valid fallback. In the absence of a initial time provided by the browser, fallback to INITIAL_TIME.
            // @ts-ignore
            // tslint:disable-next-line:deprecation
            performance.timeOrigin = (performance.timing && performance.timing.navigationStart) || INITIAL_TIME;
        }
    }

    return getGlobalObject<Window>().performance || performanceFallback;
})();
