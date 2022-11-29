import { useState, } from "react";
import { getFieldState, setFieldValue, validateField } from "./fieldFunctions";
import { processFormAction } from "./formActions";
import { FormAction, FormActionDispatch, FormElement, FormElementProps, FormEvents, FormPages, FormState, SetFormState } from "./types";

class FormConfiguration {
  // TODO: add a class constructor
  rootComponent: ({}: any) => JSX.Element = () => (<>Error! A Root component must be provided</>); 
  pages:  FormPages = {};
  startOn: string = '';
  events: FormEvents = {};  

  generate() {  
    const FormComponent = generateFormComponent(this);
    return FormComponent;
  }
}

function generateFormComponent(formConfiguration: FormConfiguration) {
  const FormComponent = () => {
    const [formState, setFormState] = useState<FormState>({_currentPage: formConfiguration.startOn});

    const dispatchFormAction = (action: FormAction) => processFormAction(action, formConfiguration, formState, setFormState);

    const RootComponent = formConfiguration.rootComponent;
    const FormPageRender = formConfiguration.pages[formState._currentPage].elements
      .map((element: FormElement, index: number) => renderElement(''+index, element, formState, setFormState, formConfiguration.events, dispatchFormAction))
    
    const props = {
      FormPageRender,
      dispatchFormAction,
      formState,
      setFormState,
      formConfiguration
    }
    
    return (
      <RootComponent {...props} />
    )
  };
  return FormComponent;
}

function renderElement(index: string, element: FormElement, formState: FormState, setFormState: SetFormState, events: FormEvents, dispatchFormAction: FormActionDispatch) {
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
    dispatchFormAction
  }
  const key = `${element.field}_${Component.name}_${index}`;
  return (
    <Component key={key} {...props}>
      {element.elements && element.elements.map((childElement: any, childIndex: number) => renderElement(index+'.'+childIndex, childElement, formState, setFormState, events, dispatchFormAction))}
    </Component>
  );
}

export {FormConfiguration};