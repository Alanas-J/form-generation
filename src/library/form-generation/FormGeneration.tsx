import { useState } from "react";
import { getFieldState, setFieldValue, validateField } from "./fieldFunctions";
import { dispatchFormAction } from "./formActions";
import { FormAction, FormElement, FormElementProps, FormEvents, FormPages, FormState, SetFormState } from "./types";

class FormConfiguration {
  startOn: string = '';
  pages:  FormPages = {};
  events: FormEvents = {};    

  generate() {
    const useStateRefs = {
      formState: null,
      setFormState: null
    }
  
    const formAction = (action: string) => {
      const {formState, setFormState} = useStateRefs;
      if(formState && setFormState) return dispatchFormAction(action, this, formState, setFormState);
      else console.error('fail', useStateRefs)
    };
  
    const FormComponent = createFormComponent(this, useStateRefs)
    return {FormComponent, formAction}
  }
}

function createFormComponent(formConfig: FormConfiguration, useStateRefs: any) {
  const FormComponent = () => {
    const [formState, setFormState] = useState<FormState>({currentPage: formConfig.startOn});
    useStateRefs.setFormState = setFormState;
    useStateRefs.formState = formState;

    const formAction = (action: string) => {
      dispatchFormAction(action, formConfig, formState, setFormState)
    };

    return (
      <>
        {formConfig.pages[formState.currentPage].elements.map((element: FormElement, index: number) => renderElement(''+index, element, formState, setFormState, formConfig.events, formAction))}
      </>
    );
  };
  return FormComponent;
}

function renderElement(index: string, element: FormElement, formState: FormState, setFormState: SetFormState, events: FormEvents, formAction: FormAction) {
  if(element.showCondition && !element.showCondition(formState)) return;
  const Component = element.component;
  
  let {value, validation} = getFieldState(element, formState);
  const setValue = (value: any) => {
    setFieldValue(element, value, formState, events.onFieldChange);
    setFormState(() => ({...formState}));
  }
  const validate = () => {
    validateField(element, formState);
    setFormState(() => ({...formState}));
  }
    
  const props: FormElementProps = {
    ...element,
    value,
    setValue,
    formState,
    setFormState,
    validation,
    validate,
    formAction
  }
  const key = `${element.field}_${Component.name}_${index}`;
  return (
    <Component key={key} {...props}>
      {element.elements && element.elements.map((childElement: any, childIndex: number) => renderElement(index+'.'+childIndex, childElement, formState, setFormState, events, formAction))}
    </Component>
  );
}

export {FormConfiguration};