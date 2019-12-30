export class Modifier {
    private limitNumber: number = 0;
    private skipNumber: number = 0;
    private field: string;
    private order: number = 1;

    limit(limit: number) {
        this.limitNumber = limit;
        return this;
    }

    skip(skip: number) {
        this.skipNumber = skip;
        return this;
    }

    sort(field: string) {
        this.field = field;
        return this;
    }

    asc() {
        this.order = 1;
    }

    desc() {
        this.order = -1;
    }

    querySort() {
        return { [this.field]: this.order }
    }

    getSkip() {
        return this.skipNumber;
    }

    getLimit() {
        return this.limitNumber;
    }
}