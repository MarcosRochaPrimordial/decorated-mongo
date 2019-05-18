import { Rule } from './rule';
import { ValidationService } from './validationService';
import 'reflect-metadata';

export const JoinRule: Rule = class {

    public static evaluate(target: Object, key: string): string | string[] {
        let validationService = new ValidationService();
        let errors: string[] = [];
        if (target[key]) {
            const properties: string[] = Reflect.getMetadata('validation', target[key]) || [];
            properties.forEach(property => {
                const errs = validationService.onSaveValidation(target[key], property);
                if (errs) {
                    errors.concat(errs);
                }
            });
        }

        return errors;
    }
}