export interface Rule {
    evaluate(target: Object, key: string): void;
}