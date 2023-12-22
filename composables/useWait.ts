// composables/useWait.ts
export function wait<T>(callback: () => T): void {
    setTimeout(() => {
        callback();
    }, 500);
}
