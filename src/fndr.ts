import { ObjectID } from "mongodb";

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

    private define(expression: object) {
        const query = {};
        query[this.key] = expression;
        return query;
    }

    public greater(value: number | string) {
        return this.define({ $gt: value });
    }

    public lesser(value: number | string) {
        return this.define({ $lt: value });
    }

    public equals(value: number | string) {
        return this.define({ $eq: value });
    }

    public in(...value: number[] | string[] | ObjectID[]) {
        return this.define({ $in: [...value] });
    }
    
    public all(...value: number[] | string[] | ObjectID[]) {
        return this.define({ $all: [...value] });
    }

    public regex(value: string) {
        return this.define({ $regex: value });
    }

    public exits(value: boolean) {
        return this.define({ $exists: value });
    }
}