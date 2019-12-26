import { Rule } from './rule';

export const RequiredRule: Rule = class {

    public static evaluate(target: Object, key: string): string {
        if (Array.isArray(target[key]) && target[key].length > 0) {
            return null;
        }
        
        if (!Array.isArray(target[key]) && target[key] != null && target[key] !== undefined) {
            return null;
        }

        return `${target.constructor.name}.${key} is required`;
    }
}
