declare global {
    interface String {
        hashCode(): number;
        format(...args: any[]): string;
        toUpperCaseFirstLetter(): string;
        replaceAll(find: string, replace: string): string;
    }
    interface Array<T> {
        insert(index: any, item: T): void;
        pushArray(arr: [T] | T[]): void;
        isArray: boolean;
    }
}
export declare function initPrototype(): void;
