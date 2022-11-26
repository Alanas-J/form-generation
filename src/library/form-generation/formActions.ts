import { validateFields, getFormValues } from "./fieldFunctions";
import { FormEvents, FormPage, FormPages, FormState, SetFormState, FormElement } from "./types";

function dispatchFormAction(action: string, pages: FormPages, events: FormEvents, formState: FormState, setFormState: SetFormState) {
  switch(action) {
    case 'next':
      const nextPage: string | undefined = pages[formState.currentPage]?.next;  

      if (nextPage) {
        if(validateFields(pages[formState.currentPage].elements, formState)) {
          formState = { ...formState, currentPage: nextPage};

          if(events.onStep) events.onStep(formState.currentPage, formState);
        }
        setFormState({...formState})
      }
        break;
      case 'previous':
        const previousPage: string | undefined = pages[formState.currentPage]?.previous;

        if (previousPage) {
          formState = { ...formState, currentPage: previousPage};
          setFormState(formState);

          if(events.onStep) events.onStep(formState.currentPage, formState);
        }
      break;
    case 'submit':
      const formValues = getFormValues(formState, pages);
      if(events.onSubmit) events.onSubmit(formValues);
      console.log('submit');
      break;
  }
  return formState;
}

export {dispatchFormAction};