export interface LightMap<K, V> {
    [Symbol.toStringTag]: string;
    has(key: K): boolean;
    get(key: K): V | undefined;
    set(key: K, value: V): this;
    delete(key: K): boolean;
    keys(): Iterable<K>;
}

export class LightMapImpl<K, V> implements LightMap<K, V> {
    [Symbol.toStringTag]: string;

    private readonly record: [K, V][] = [];

    public has(key: K): boolean {
        return this.record.map(([_key]) => _key).indexOf(key) >= 0;
    }

    public get(key: K): V | undefined {
        const [entry] = this.record.filter(([_key]) => _key === key);
        if (entry === undefined) {
            return undefined;
        }

        return entry[1];
    }

    public set(key: K, value: V) {
        const [entry] = this.record.filter(([_key]) => _key === key);
        if (entry === undefined) {
            this.record.push([key, value]);
        } else {
            entry[1] = value;
        }

        return this;
    }

    public delete(key: K): boolean {
        const index = this.record.map(([key]) => key).indexOf(key);

        if (index < 0) {
            return false;
        }

        this.record.splice(index, 1);

        return true;
    }

    public keys(): Iterable<K> {
        return this.record.map(([key]) => key);
    }
}

export const Polyfill: { new <K, V>(): LightMap<K, V> } =
    typeof Map !== "undefined" ? Map : LightMapImpl;
