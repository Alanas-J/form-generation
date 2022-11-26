export type FormElement = {
    component: (props: FormElementProps) => JSX.Element,
    field?: string,
    validations?: Array<Function> 
    componentProps?: object,
    defaultValue?: any,
    showCondition?: (formState: any) => boolean,
    elements?: Array<FormElement>
}
export type FormElementProps = {
    component: (props: FormElementProps) => JSX.Element,
    field?: string,
    validations?: Array<Function> 
    componentProps?: object,
    defaultValue?: any,
    showCondition?: (formState: any) => boolean,
    elements?: Array<FormElement>,

    children?: (JSX.Element | undefined)[] | undefined,
    value: any,
    setValue: (value: any) => void,
    formState: FormState,
    setFormState: SetFormState,
    validation: FormElementValidation | undefined,
    validate: () => void,
    formAction: FormAction
}
export type FormElementValidation = {
    error?: boolean,
    message?: string,
}

export type FormAction = (action: string) => FormState | undefined

export type FormPage = {
    next?: string,
    previous?: string,
    submit?: boolean,
    elements: Array<FormElement>
}

export type FormPages = { 
    [key: string]: FormPage
}

export type FormEvents = {
    onStep?: (currentPage: string, formState: FormState) => any,
    onFieldChange?: (field: string, value: any, formState: FormState) => any,
    onSubmit?: Function,
    onValidationFailure?: Function
}

export type FormState = {
    currentPage: string,
    [key: string]: any;
}
export type SetFormState =  React.Dispatch<React.SetStateAction<FormState>>