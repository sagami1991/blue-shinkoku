interface ISortOption<T> {
    keyName: keyof T;
    type: "ASC" | "DESC";
}

export class CommonUtils {
    public static getSimpleDate(date: Date): string {
        return Utilities.formatDate(date, "JST", "yyyy/MM/dd");
    }

    public static sortArray<T>(array: T[], sortOptions: Array<ISortOption<T>>): T[] {
        return array.sort((a, b) => {
            for (const sort of sortOptions) {
                if (a[sort.keyName] > b[sort.keyName]) {
                    return 1 * (sort.type === "ASC" ? 1 : -1);
                }
                if (a[sort.keyName] < b[sort.keyName]) {
                    return -1 * (sort.type === "ASC" ? 1 : -1);
                }
            }
            return 0;
        });
    }

    /** TODO gas用のlodashを探す */
    public static find<T>(array: T[], filter: (item: T) => boolean | void): T | undefined {
        for (const item of array) {
            if (filter(item)) {
                return item;
            }
        }
    }

    public static arrayToMap<T>(array: T[], key: keyof T) {
        const map: {[key: string]: T} = {};
        array.forEach(item => {
            map[item[key] as any] = item;
        });
        return map;
    }

    public static mapToArray<T>(map: {[key: string]: T}): T[] {
        return Object.keys(map).map(key => map[key]);
    }
}
