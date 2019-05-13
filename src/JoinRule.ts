import { Rule } from './rule';

export const JoinRule: Rule = class {
    static evaluate(object: Object, key: string): string {
        if (object[key]) {
            console.log(Object.keys(object[key]));
        }

        return "Erro";
    }
}