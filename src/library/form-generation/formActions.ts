import { validateFields, getSubmissionValues } from './fieldFunctions';
import { FormConfiguration } from './FormGeneration';
import { FormState, SetFormState, FormAction } from './types';

function processFormAction(action: FormAction, formConfig: FormConfiguration, formState: FormState, setFormState: SetFormState): FormState {
  switch(action.type) {
  case 'next':
    return handleSteppingNext(formConfig, formState, setFormState);
  case 'previous':
    return handleSteppingBack(formConfig, formState, setFormState);
  case 'submit':
    return handleSubmit(formConfig, formState, setFormState);
  case 'set-form-state':
    return handleSetFormState(action.payload, formState, setFormState);
  case 'reset-form': 
    return handleResetFormState(formConfig, formState, setFormState);
  }
  throw `FormAction type ${action.type} is not recognised`;
}

function handleSteppingNext(formConfig: FormConfiguration, formState: FormState, setFormState: SetFormState) {
  const {events, pages} = formConfig;
  const nextPage: string | undefined = pages[formState._currentPage]?.next;  

  if (nextPage) {
    if(validateFields(pages[formState._currentPage].elements, formState)) {
      formState._currentPage = nextPage;
  
      if(events.onStep) events.onStep(formState._currentPage, formState);
    } else {
      if(events.onPageValidationFail) events.onPageValidationFail(formState._currentPage, formState);
    }
    setFormState({...formState});
  }
  return formState;
}

function handleSteppingBack(formConfig: FormConfiguration, formState: FormState, setFormState: SetFormState) {
  const {events, pages} = formConfig;
  const previousPage: string | undefined = pages[formState._currentPage]?.previous;

  if (previousPage) {
    formState._currentPage = previousPage;
    setFormState({...formState});

    if(events.onStep) events.onStep(formState._currentPage, formState);
  }
  return formState;
}

function handleSubmit(formConfig: FormConfiguration, formState: FormState, setFormState: SetFormState) {
  const formValues = getSubmissionValues(formState, formConfig.pages);
  const dispatchFormAction = (action: FormAction) => processFormAction(action, formConfig, formState, setFormState);

  if(formConfig.events.onSubmit) formConfig.events.onSubmit(formValues, dispatchFormAction);

  formState._submissionState = 'submitting';
  setFormState({...formState});
  return formState;
}

function handleSetFormState(action: FormState, formState: FormState, setFormState: SetFormState) {
  // TODO: add in guards later...
  setFormState(action);
  return formState;
}

function handleResetFormState(formConfig: FormConfiguration, formState: FormState, setFormState: SetFormState) {
  setFormState({_currentPage: formConfig.startOn});
  return formState;
}

export {processFormAction};
