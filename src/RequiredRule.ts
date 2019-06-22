import { Rule } from './rule';

export const RequiredRule: Rule = class {

    public static evaluate(target: Object, key: string): string {
        if (target[key] != null && target[key] !== undefined) {
            return null;
        }

        return `${target.constructor.name}.${key} is required`;
    }
}
