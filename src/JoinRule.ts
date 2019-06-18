import { Rule } from './rule';
import { ValidationService } from './validationService';
import 'reflect-metadata';

export const JoinRule: Rule = class {

    public static evaluate(target: Object, key: string): void {
        let validationService = new ValidationService();
        if (target[key]) {
            const properties: string[] = Reflect.getMetadata('validation', target[key]) || [];
            properties.forEach(property => {
                validationService.onSaveValidation(target[key], property);
            });
        }
    }
}