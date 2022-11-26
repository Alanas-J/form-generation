import { useState } from 'react';
import { FormAction, FormElement, FormElementProps, FormEvents, FormPages, FormState, SetFormState } from './types';

class FormConfiguration {
  startOn: string = '';
  pages:  FormPages = {};
  events: FormEvents = {};
  
  generate() {
    let _formState: FormState | null = null;
    let _setFormState: SetFormState | null = null;

    const _formAction = (action: string) => {
      if(_formState && _setFormState) return formAction(action, this.pages, this.events, _formState, _setFormState);
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

function formAction(action: string, pages: FormPages, events: FormEvents, formState: FormState, setFormState: SetFormState) {
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
      console.log('submit');
      break;
  }
  return formState;
}



function renderElement(index: string, element: FormElement, formState: FormState, setFormState: SetFormState, events: FormEvents, formAction: FormAction) {
  if(element.showCondition && !element.showCondition(formState)) return;
  const Component = element.component;

  let {value, validation} = getFieldState(element, formState);
  const setValue = (value: any) => setField(element, value, formState, setFormState, events.onFieldChange);
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

function getFieldState(element: FormElement, formState: FormState) {
  let value;
  let validation;

  if(element.field){
    const keys = element.field.split('.');
    
    let currentNode = formState;
    for(const key of keys) {

      if (currentNode[key] === undefined){
        if(element.defaultValue) currentNode[key] = {};
        else return {value, validation};
      }
      currentNode = currentNode[key];
    }
    if(!currentNode.value && element.defaultValue) currentNode.value = element.defaultValue;

    value = currentNode?.value;
    validation = currentNode?.validation;
  }
  else {
    value = 'No field key provided'; // TODO: look into better way to handle
  }
  
  return {value, validation};
}

function setField( element: FormElement, value: any, formState: FormState, setFormState: SetFormState, onFieldChange: any) {
  if(element.field){
    const keys = element.field.split('.');
    
    let currentNode = formState;
    for(const key of keys) {
      if (currentNode[key] === undefined) currentNode[key] = {};
      currentNode = currentNode[key];
    }
    currentNode.value = value;
    if(currentNode?.validation?.error) validateField(element, formState);

    if(onFieldChange) onFieldChange(element.field, value, formState);
    setFormState(() => ({...formState}));
  }
  else {
    console.error(`Error No field key provided for where to store the value! Attempted to store '${value}'`); // TODO: Add in better error handling
  }
};

function validateField( element: FormElement, formState: FormState) {
  let error: boolean = false;

  if(element.validations) {
    for(const validate of element.validations) {
      let result: any;
      let value: any;

      if(element.field) {
        const keys = element.field.split('.');

        let currentNode = formState;
        for(const key of keys) {
          if (currentNode[key] === undefined) currentNode[key] = {};
          currentNode = currentNode[key];
        }
        value = currentNode?.value;
        result = validate(value);
        currentNode.validation = result;
      } 
      else {
        console.error(`Error: No field key is provided to validate on!`); // TODO: Add in better error handling
      }

      if(result.error === true){
        error = error || result.error;
        break;
      }
    }
  }
  return !error;
}

function validateFields(elements: Array<FormElement>, formState: FormState): boolean {
  let error: boolean = false;

  for(const element of elements) {
    if(element.showCondition && !element.showCondition(formState)) continue;

    let elementError = !validateField(element, formState)
    if(element.elements) elementError = !validateFields(element.elements, formState) || elementError;

    error =  error || elementError;
  }
  return !error;
}

export {FormConfiguration};
