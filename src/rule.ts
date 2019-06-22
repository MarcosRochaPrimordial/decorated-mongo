export interface Rule {
    evaluate(target: Object, key: string): string | string[];
}