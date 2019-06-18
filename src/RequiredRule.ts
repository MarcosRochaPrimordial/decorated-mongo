import { Rule } from './rule';

export const RequiredRule: Rule = class {

    public static evaluate(target: Object, key: string): void {
        if (target[key] != null && target[key] !== undefined) {
            return null;
        }

        throw new Error(`${target.constructor.name}.${key} is required`);
    }
}
