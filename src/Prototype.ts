declare global {
    interface String {
        hashCode(): number

        format(...args): string

        toUpperCaseFirstLetter(): string

        replaceAll(find: string, replace: string): string
    }

    interface Array<T> {
        insert(index, item: T): void

        pushArray(arr: [T] | T[]): void

        isArray: boolean
    }
}

export function initPrototype() {
//     //region string prototype
    String.prototype.hashCode = function () {
        let hash = 0;
        if (this.length === 0) return hash;
        for (let i = 0; i < this.length; i++) {
            let char = this.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash;
    };
    String.prototype.format = function () {
        let content = this;
        for (let i = 0; i < arguments.length; i++) {
            let replacement = '{' + i + '}';
            content = content.replaceAll(replacement, arguments[i])
        }
        return content as any;
    };
    String.prototype.replaceAll = function (find: string, replace: string) {
        let str = this;
        return str.replace(new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), replace)
    };
    String.prototype.toUpperCaseFirstLetter = function () {
        let str = this;
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

//endregion

//region array prototypes
    Array.prototype.insert = function (index, item) {
        this.splice(index, 0, item)
    };
    Array.prototype.pushArray = function (arr: [any] | any[]) {
        this.push.apply(this, arr)
    };
    Array.prototype.isArray = true;
//endregion
}
