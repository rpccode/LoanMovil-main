import { useState } from 'react';

type FormState<T> = {
    [K in keyof T]: {
        value: T[K];
        error: string | null;
    };
};

type FormErrors<T> = {
    [K in keyof T]?: string;
};

type ValidationRules<T> = {
    [K in keyof T]?: (value: T[K]) => string | null;
};

export const useForm = <T extends Record<string, any>>(
    initState: T,
    validationRules: ValidationRules<T> = {}
) => {
    const [formState, setFormState] = useState<FormState<T>>(
        () =>
            Object.keys(initState).reduce((acc, key) => {
                acc[key as keyof T] = { value: initState[key], error: null };
                return acc;
            }, {} as FormState<T>)
    );

    const validateField = <K extends keyof T>(field: K, value: T[K]) => {
        if (validationRules[field]) {
            const errorMessage = validationRules[field]!(value);
            setFormState((prevFormState) => ({
                ...prevFormState,
                [field]: { ...prevFormState[field], error: errorMessage },
            }));
            return errorMessage;
        }
        return null;
    };

    const onChange = <K extends keyof T>(value: T[K], field: K) => {
        const error = validateField(field, value);
        setFormState((prevFormState) => ({
            ...prevFormState,
            [field]: { value, error },
        }));
    };

    const validateForm = () => {
        const errors: FormErrors<T> = {};
        for (const field in validationRules) {
            if (Object.prototype.hasOwnProperty.call(validationRules, field)) {
                const error = validateField(field as keyof T, formState[field].value);
                if (error) {
                    errors[field] = error;
                }
            }
        }
        return errors;
    };
    const resetForm = () => {
        setFormState(
            Object.keys(initState).reduce((acc, key) => {
                acc[key as keyof T] = { value: initState[key], error: null };
                return acc;
            }, {} as FormState<T>)
        );
    };

    return {
        ...formState,
        formState,
        onChange,
        validateForm,
        validateField,
        resetForm
    };
};
