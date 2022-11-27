import { validateFields, getSubmissionValues } from "./fieldFunctions";
import { FormConfiguration } from "./FormGeneration";
import { FormEvents, FormPage, FormPages, FormState, SetFormState, FormElement } from "./types";

function dispatchFormAction(action: string, formConfig: FormConfiguration, formState: FormState, setFormState: SetFormState) {
  switch(action) {
    case 'next':
      handleSteppingNext(formConfig, formState, setFormState);
      break;
    case 'previous':
      handleSteppingBack(formConfig, formState, setFormState);
      break;
    case 'submit':
      handleSubmit(formConfig, formState);
      break;
  }
  return formState;
}

function handleSteppingNext(formConfig: FormConfiguration, formState: FormState, setFormState: SetFormState) {
  const {events, pages} = formConfig;
  const nextPage: string | undefined = pages[formState.currentPage]?.next;  

  if (nextPage) {
    if(validateFields(pages[formState.currentPage].elements, formState)) {
      formState = { ...formState, currentPage: nextPage};
  
      if(events.onStep) events.onStep(formState.currentPage, formState);
    }
    setFormState({...formState})
  }
}

function handleSteppingBack(formConfig: FormConfiguration, formState: FormState, setFormState: SetFormState) {
  const {events, pages} = formConfig;
  const previousPage: string | undefined = pages[formState.currentPage]?.previous;

  if (previousPage) {
    formState = { ...formState, currentPage: previousPage};
    setFormState(formState);

    if(events.onStep) events.onStep(formState.currentPage, formState);
  }
}

function handleSubmit(formConfig: FormConfiguration, formState: FormState){
  const formValues = getSubmissionValues(formState, formConfig.pages);
  if(formConfig.events.onSubmit) formConfig.events.onSubmit(formValues);
  console.log('submit');
}

export {dispatchFormAction};