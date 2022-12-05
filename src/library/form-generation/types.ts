import { FormConfiguration } from './FormGeneration';

export type FormElement = {
    component: (props: FormElementProps) => JSX.Element,
    field?: string,
    validations?: Array<(value: unknown) => FormElementValidation> 
    componentProps?: {[key: string]: any },
    defaultValue?: unknown,
    showCondition?: (formState: unknown) => boolean,
    elements?: Array<FormElement>
}
export type FormElementProps = {
    component: (props: FormElementProps) => JSX.Element,
    field?: string,
    validations?: Array<() => FormElementValidation> 
    componentProps?: {[key: string]: any;},
    defaultValue?: unknown,
    showCondition?: (formState: unknown) => boolean,
    elements?: Array<FormElement>,

    children?: (JSX.Element | undefined)[] | undefined,
    value: unknown,
    setValue: (value: unknown) => void,
    formState: FormState,
    setFormState: SetFormState,
    validation: FormElementValidation | undefined,
    validate: () => void,
    dispatchFormAction: FormActionDispatch
}
export type FormElementValidation = {
    error: boolean,
    message?: string,
}
export type RootComponentProps = {
    FormPageRender: (JSX.Element | undefined)[],
    dispatchFormAction: FormActionDispatch,
    formState: FormState,
    setFormState: SetFormState,
    formConfiguration: FormConfiguration
}

export type FormPage = {
    next?: string,
    previous?: string,
    isSubmissionPage?: boolean,
    elements: Array<FormElement>
}

export type FormPages = { 
    [key: string]: FormPage
}

export type FormEvents = {
    onStep?: (currentPage: string, formState: FormState) => void,
    onFieldChange?: (field: string, value: unknown, formState: FormState) => void,
    onSubmit?: (formValues: object, dispatchFormAction: FormActionDispatch) => void,
    // onValidationFailure?: Function
}

export type FormState = {
    _currentPage: string,
    _submissionState?: string 
    [key: string]: any;
}
export type SetFormState =  React.Dispatch<React.SetStateAction<FormState>>

export type FormAction = {
    type: string,
    payload?: any
}

export type FormActionDispatch = (action: FormAction) => FormState;