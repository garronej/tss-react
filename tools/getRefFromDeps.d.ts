import type { DependencyList } from "react";
export declare function getRefFromDepsFactory(params: {
    max: number;
}): {
    getRefFromDeps: (deps: DependencyList) => Object;
};
