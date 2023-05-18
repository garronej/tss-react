export function getDefaultExport<T>(m: { default: T }): T {
    return (m.default as any).default ?? m.default;
}
