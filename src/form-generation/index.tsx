import { useState } from 'react';

class FormConfiguration {
  startOn: string = '';
  pages: any;
  events: any = {
    onStep: null,
    onFieldChange: null,
    onSubmit: null, // TODO: Not plugged in yet.
    onValidationFailure: null // TODO: Not plugged in yet.
  }
  
  generate(): any {
    let _formState: any = null;
    let _setFormState: any = null;

    const FormComponent = () => {
      const [formState, setFormState] = useState<any>({currentPage: this.startOn});
      _setFormState = setFormState;
      _formState = formState;

      return (
        <>
          { 
            this.pages[formState.currentPage].elements.map((element: any, index: number) => renderElement(''+index, element, formState, setFormState, this.events?.onFieldChange))
          }
        </>
      );
    };

    const formAction = (action: string) => _formAction(action, this.pages, this.events, _formState, _setFormState)

    return { FormComponent, formAction }
  }
}

function _formAction(action: string, pages: any, events: any, formState: any, setFormState: any) {
  switch(action) {
    case 'next':
      if (setFormState && pages[formState.currentPage].next) {
        if(validateFields(pages[formState.currentPage].elements, formState)) {
          formState = { ...formState, currentPage: pages[formState.currentPage].next};

          if(events.onStep) events.onStep(formState);
        }
        setFormState({...formState})
      }
      break;
      case 'previous':
        if (setFormState && pages[formState.currentPage].previous){
        formState = { ...formState, currentPage: pages[formState.currentPage].previous};
        setFormState(formState)

        if(events.onStep) events.onStep(formState);
      }
      break;
    case 'submit':
      console.log('submit');
      break;
  }
  return formState;
}



function renderElement(index: string, element: any, formState: any, setFormState: any, onFieldChange: any) {
  if(element.showCondition && !element.showCondition(formState)) return;
  const Component = element.component;

  let {value, validation} = getFieldState(element, formState);
  const setValue = (value: any) => setField(element, value, formState, setFormState, onFieldChange);
  const validate = () => {
    validateField(element, formState);
    setFormState(() => ({...formState}));
  }
  
  const props = {
    ...element,
    value,
    setValue,
    formState,
    setFormState,
    validation,
    validate
  }
  const key = `${element.field}_${Component.name}_${index}`;
  return (
    <Component key={key} {...props}>
      {element.elements && element.elements.map((childElement: any, childIndex: number) => renderElement(index+'.'+childIndex, childElement, formState, setFormState, onFieldChange))}
    </Component>
  );
}

function getFieldState(element: any, formState: any) {
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

function setField( element: any, value: any, formState: any, setFormState: any, onFieldChange: any) {
  if(element.field){
    const keys = element.field.split('.');
    
    let currentNode = formState;
    for(const key of keys) {
      if (currentNode[key] === undefined) currentNode[key] = {};
      currentNode = currentNode[key];
    }
    currentNode.value = value;
    if(currentNode?.validation?.error) validateField(element, formState);

    if(onFieldChange) onFieldChange(`${element.field} set to '${value}'`, formState);
    setFormState(() => ({...formState}));
  }
  else {
    console.error(`Error No field key provided for where to store the value! Attempted to store '${value}'`); // TODO: Add in better error handling
  }
};

function validateField( element: any, formState: any) {
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

function validateFields(elements: any, formState: any): boolean {
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
