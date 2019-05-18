import { Rule } from "./rule";

export class ValidationService {
    public onSaveValidation(target: Object, property: string) {
        const errors: string[] = [];
        const rules: Rule[] = Reflect.getMetadata('validation', target, property) || [];
        rules.forEach(rule => {
            const error = rule.evaluate(target, property);
            if (error) {
                errors.concat(error);
            }
        });

        return errors;
    }
}