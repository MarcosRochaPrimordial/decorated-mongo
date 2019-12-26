import { Rule } from "./rule";

export class ValidationService {
    private validate: string = 'validation';

    public onSaveValidation(target: Object, property: string): string[] {
        const rules: Rule[] = Reflect.getMetadata(this.validate, target, property) || [];
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