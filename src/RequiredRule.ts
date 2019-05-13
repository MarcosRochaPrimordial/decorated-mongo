import { Rule } from './rule';

export const RequiredRule: Rule = class {
    static evaluate(object: Object, key: string): string {
        if (object[key]) {
            return null;
        }

        return `${key} is required`;
    }
}
