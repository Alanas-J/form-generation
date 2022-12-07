/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormConfiguration } from './FormGeneration';

export type FormElement = {
    component: (props: FormElementProps) => JSX.Element,
    field?: string,
    validations?: Array<(value: any) => FormElementValidation> 
    componentProps?: {[key: string]: any },
    defaultValue?: unknown,
    showCondition?: (formState: FormState) => boolean,
    elements?: Array<FormElement>
}
export type FormElementProps = {
    component: (props: FormElementProps) => JSX.Element,
    field?: string,
    validations?: Array<(value: any) => FormElementValidation> 
    componentProps?: {[key: string]: any;},
    defaultValue?: unknown,
    showCondition?: (formState: FormState) => boolean,
    elements?: Array<FormElement>,

    children?: (JSX.Element | undefined)[] | undefined,
    value: unknown,
    setValue: (value: unknown) => void,
    formState: FormState,
    setFormState: SetFormState,
    validation: FormElementValidation | undefined,
    validate: (value: any) => void,
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
    onPageValidationFail?: (currentPage: string, formState: FormState) => void,
    onFieldChange?: (field: string, value: unknown, formState: FormState) => void,
    onSubmit?: (formValues: object, completeSubmission: () => void) => void
}

export type FormState = {
    _currentPage: string,
    _submissionState?: string 
    [key: string]: any
}
export type SetFormState =  React.Dispatch<React.SetStateAction<FormState>>

export type FormAction = { // TODO: Figure out exactly what a form action should look like
    type: string,
    payload?: any 
}

export type FormActionDispatch = (action: FormAction) => FormState;