import { Rule } from './rule';
import { ValidationService } from './validationService';
import 'reflect-metadata';

export const JoinRule: Rule = class {

    private static validate: string = 'validation';

    public static evaluate(target: Object, key: string): string[] {
        let errors = [];
        if (target[key]) {
            if (Array.isArray(target[key])) {
                target[key].forEach(value => {
                    errors = this.verifyValidations(value);
                });
            } else {
                errors = this.verifyValidations(target[key]);
            }
        }

        return errors;
    }

    private static verifyValidations(value: any): any[] {
        let validationService = new ValidationService();
        const properties: string[] = Reflect.getMetadata(this.validate, value) || [];
        let errors = [];
        properties.forEach(property => {
            const err = validationService.onSaveValidation(value, property);
            if (err.length > 0) {
                errors = errors.concat(err);
            }
        });
        return errors;
    }
}