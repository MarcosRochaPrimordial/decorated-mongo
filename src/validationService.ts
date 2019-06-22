import { Rule } from "./rule";

export class ValidationService {
    public onSaveValidation(target: Object, property: string): string[] {
        const rules: Rule[] = Reflect.getMetadata('validation', target, property) || [];
        let errors = [];
        rules.forEach(rule => {
            const err = rule.evaluate(target, property);
            if (err) {
                errors = errors.concat(err);
            }
        });

        return errors;
    }
}