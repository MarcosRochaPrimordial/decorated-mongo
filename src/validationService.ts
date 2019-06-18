import { Rule } from "./rule";

export class ValidationService {
    public onSaveValidation(target: Object, property: string) {
        const rules: Rule[] = Reflect.getMetadata('validation', target, property) || [];
        rules.forEach(rule => {
            rule.evaluate(target, property);
        });
    }
}