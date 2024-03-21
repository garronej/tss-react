import { useState } from "react";

/** Like react's useMemo but with guarantee that the fn
 * won't be invoked again if deps hasn't change */
export function useGuaranteedMemo<T>(
    fn: () => T,
    deps: React.DependencyList
): T {
    const [ref] = useState<{
        current: { v: T; prevDeps: unknown[] } | undefined;
    }>({ "current": undefined });

    if (
        ref.current === undefined ||
        deps.length !== ref.current.prevDeps.length ||
        ref.current.prevDeps.map((v, i) => v === deps[i]).indexOf(false) >= 0
    ) {
        ref.current = {
            "v": fn(),
            "prevDeps": [...deps]
        };
    }

    return ref.current.v;
}
