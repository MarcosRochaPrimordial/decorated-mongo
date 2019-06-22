import { Rule } from './rule';
import { ValidationService } from './validationService';
import 'reflect-metadata';

export const JoinRule: Rule = class {

    public static evaluate(target: Object, key: string): string[] {
        let validationService = new ValidationService();
        let errors = [];
        if (target[key]) {
            const properties: string[] = Reflect.getMetadata('validation', target[key]) || [];
            properties.forEach(property => {
                const err = validationService.onSaveValidation(target[key], property);
                if (err.length > 0) {
                    errors = errors.concat(err);
                }
            });
        }

        return errors;
    }
}