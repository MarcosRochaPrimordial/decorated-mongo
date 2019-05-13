export interface Rule {
    evaluate(object: Object, key: string): string;
}