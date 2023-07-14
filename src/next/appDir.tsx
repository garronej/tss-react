"use client";

import React from "react";
import createCache from "@emotion/cache";
import { useServerInsertedHTML } from "next/navigation";
import { useState } from "react";
import { CacheProvider as DefaultCacheProvider } from "@emotion/react";
import type { Options as OptionsOfCreateCache } from "@emotion/cache";
import type { EmotionCache } from "@emotion/cache";
import type { ReactNode } from "react";

export type NextAppDirEmotionCacheProviderProps = {
    /** This is the options passed to createCache() from 'import createCache from "@emotion/cache"' */
    options: Omit<OptionsOfCreateCache, "insertionPoint">;
    /** By default <CacheProvider /> from 'import { CacheProvider } from "@emotion/react"' */
    CacheProvider?: (props: {
        value: EmotionCache;
        children: ReactNode;
    }) => JSX.Element | null;
    children: ReactNode;
};

export function NextAppDirEmotionCacheProvider(
    props: NextAppDirEmotionCacheProviderProps
) {
    const { options, CacheProvider = DefaultCacheProvider, children } = props;

    const [{ cache, flush }] = useState(() => {
        const cache = createCache(options);
        cache.compat = true;
        const prevInsert = cache.insert;
        let inserted: { name: string; isGlobal: boolean }[] = [];
        cache.insert = (...args) => {
            const [selector, serialized] = args;
            if (cache.inserted[serialized.name] === undefined) {
                inserted.push({
                    "name": serialized.name,
                    "isGlobal": selector === ""
                });
            }
            return prevInsert(...args);
        };
        const flush = () => {
            const prevInserted = inserted;
            inserted = [];
            return prevInserted;
        };
        return { cache, flush };
    });

    useServerInsertedHTML(() => {
        const inserted = flush();
        if (inserted.length === 0) {
            return null;
        }
        let styles = "";
        let dataEmotionAttribute = cache.key;

        const globals: {
            name: string;
            style: string;
        }[] = [];

        for (const { name, isGlobal } of inserted) {
            const style = cache.inserted[name];

            if (typeof style === "boolean") {
                continue;
            }

            if (isGlobal) {
                globals.push({ name, style });
            } else {
                styles += style;
                dataEmotionAttribute += ` ${name}`;
            }
        }

        return (
            <>
                {globals.map(({ name, style }) => (
                    <style
                        key={name}
                        data-emotion={`${cache.key}-global ${name}`}
                        dangerouslySetInnerHTML={{ "__html": style }}
                    />
                ))}
                {styles !== "" && (
                    <style
                        data-emotion={dataEmotionAttribute}
                        dangerouslySetInnerHTML={{ "__html": styles }}
                    />
                )}
            </>
        );
    });

    return <CacheProvider value={cache}>{children}</CacheProvider>;
}

export default NextAppDirEmotionCacheProvider;
