export class Fndr {
    private key = '';

    constructor(key: string) {
        this.key = key;
    }

    public static where(key: string) {
        return new Fndr(key);
    }

    public static and(...finders: object[]) {
        return { $and: finders }
    }

    public static or(...finders: object[]) {
        return { $or: finders };
    }

    public greater(value: number | string) {
        const query = {};
        query[this.key] = { $gt: value };
        return query;
    }

    public lesser(value: number | string) {
        const query = {};
        query[this.key] = { $lt: value };
        return query;
    }

    public equals(value: number | string) {
        const query = {};
        query[this.key] = { $eq: value };
        return query;
    }
}