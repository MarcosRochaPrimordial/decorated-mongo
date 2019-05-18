import { Rule } from './rule';

export const RequiredRule: Rule = class {
    static evaluate(target: Object, key: string): string {
        if (target[key]) {
            return null;
        }

        return `${key} is required`;
    }
}
