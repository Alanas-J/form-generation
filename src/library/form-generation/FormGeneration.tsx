import { useState } from "react";
import { getFieldState, setFieldValue, validateField } from "./fieldFunctions";
import { dispatchFormAction } from "./formActions";
import { FormAction, FormElement, FormElementProps, FormEvents, FormPages, FormState, SetFormState } from "./types";

class FormConfiguration {
  startOn: string = '';
  pages:  FormPages = {};
  events: FormEvents = {};
    
  generate() {
    let _formState: FormState | null = null;
    let _setFormState: SetFormState | null = null;
  
    const _formAction = (action: string) => {
      if(_formState && _setFormState) return dispatchFormAction(action, this.pages, this.events, _formState, _setFormState);
    };
  
    const FormComponent = () => {
      const [formState, setFormState] = useState<FormState>({currentPage: this.startOn});
      _setFormState = setFormState;
      _formState = formState;
  
      return (
        <>
          { 
            this.pages[formState.currentPage].elements.map((element: FormElement, index: number) => renderElement(''+index, element, formState, setFormState, this.events, _formAction))
          }
        </>
      );
    };
    return { FormComponent, formAction: _formAction }
  }
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