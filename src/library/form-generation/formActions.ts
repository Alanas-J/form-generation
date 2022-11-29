import { validateFields, getSubmissionValues } from "./fieldFunctions";
import { FormConfiguration } from "./FormGeneration";
import { FormEvents, FormPage, FormPages, FormState, SetFormState, FormElement, FormAction } from "./types";

function processFormAction(action: FormAction, formConfig: FormConfiguration, formState: FormState, setFormState: SetFormState) {
  switch(action.type) {
    case 'next':
      return handleSteppingNext(formConfig, formState, setFormState);
    case 'previous':
      return handleSteppingBack(formConfig, formState, setFormState);
    case 'submit':
      return handleSubmit(formConfig, formState, setFormState, action.options);
  }
}

function handleSteppingNext(formConfig: FormConfiguration, formState: FormState, setFormState: SetFormState) {
  const {events, pages} = formConfig;
  const nextPage: string | undefined = pages[formState.currentPage]?.next;  

  if (nextPage) {
    if(validateFields(pages[formState.currentPage].elements, formState)) {
      formState.currentPage = nextPage;
  
      if(events.onStep) events.onStep(formState.currentPage, formState);
    }
    setFormState({...formState})
  }
  return formState;
}

function handleSteppingBack(formConfig: FormConfiguration, formState: FormState, setFormState: SetFormState) {
  const {events, pages} = formConfig;
  const previousPage: string | undefined = pages[formState.currentPage]?.previous;

  if (previousPage) {
    formState.currentPage = previousPage;
    setFormState({...formState});

    if(events.onStep) events.onStep(formState.currentPage, formState);
  }
  return formState;
}

function handleSubmit(formConfig: FormConfiguration, formState: FormState, setFormState: SetFormState, options?: object) {
  const formValues = getSubmissionValues(formState, formConfig.pages);
  const dispatchFormAction = (action: FormAction) => processFormAction(action, formConfig, formState, setFormState);

  if(formConfig.events.onSubmit) formConfig.events.onSubmit(formValues, dispatchFormAction);

  return formState;
}

export {processFormAction};
