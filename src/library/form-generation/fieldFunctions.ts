import { FormElement, FormElementValidation, FormEvents, FormState, SetFormState } from "./types";

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
  
  return {value, validation};
}

function setFieldValue( element: FormElement, value: any, formState: FormState, onFieldChange: FormEvents['onFieldChange']) {
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
  }
  else {
    console.error(`Error No field key provided for where to store the value! Attempted to store '${value}'`); // TODO: Add in better error handling
  }
};

function validateField( element: FormElement, formState: FormState) {
  let error: boolean = false;

  if(element.validations) {
    for(const validate of element.validations) {
      let result: FormElementValidation | undefined;
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

      if(result && result.error === true) {
        error = true;
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

// Creates an object of values from FormState that are from visible elements.
function getFormValues(formState: FormState, pages: FormPages){
  const formValues = {};

  function addFormValueFromElement(element: FormElement, formState: FormState, formValues: object){
    if((element.showCondition && element.showCondition(formState)) || !element.showCondition){
      const {value} = getFieldState(element, formState);
  
      if(value && element.field){
        const keys = element.field.split('.');
        
        let currentNode: {[key: string]: any} = formValues;
        for(const key of keys){
          if(currentNode[key] === undefined) currentNode[key] = {};
          currentNode = currentNode[key];
        }
        currentNode.value = value;
      }
      if(element.elements){
        for(const _element of element.elements){
            addFormValueFromElement(_element, formState, formValues);
        }
      }
    }
  }
  
  for(const pageName of Object.keys(pages)){
    for(const element of pages[pageName].elements){
      addFormValueFromElement(element, formState, formValues);
    }
  }
  return formValues;
}

export {
  getFieldState,
  setFieldValue,
  validateField,
  validateFields,
  getFormValues
}