import { useState } from 'react';

class FormGenerator {
  startOn: string = '';
  sections: any;
  onStep: any;
  onFieldChange: any;
  onSubmit: any; // TODO: Not plugged in yet.
  onValidationFailure: any; // TODO: Not plugged in yet.
  
  generate(): any {
    let _formState: any = null;
    let _setFormState: any = null;

    const FormComponent = () => {
      const [formState, setFormState] = useState<any>({_section: this.startOn});
      _setFormState = setFormState;
      _formState = formState;

      return (
        <>
          { 
            this.sections[formState._section].elements.map((element: any) => renderElement(element, formState, setFormState, this.onFieldChange))
          }
        </>
      );
    };

    const formAction = (action: string) => {
      let formState = _formState;
      
      switch(action) {
        case 'next':
          if (_setFormState && this.sections[_formState._section].next) {
            if(validateFields(this.sections[_formState._section].elements, formState)) {
              formState = { ..._formState, _section: this.sections[_formState._section].next};

              if(this.onStep) this.onStep(formState);
            }
            _setFormState({...formState})
          }
          break;
        case 'previous':
          if (_setFormState && this.sections[_formState._section].previous){
            const formState = { ..._formState, _section: this.sections[_formState._section].previous};
             _setFormState(formState)

             if(this.onStep) this.onStep(formState);
          }
          break;
        case 'submit':
          console.log('submit');
          break;
      }
      return _formState;
    }

    return { FormComponent, formAction }
  }
}
export default FormGenerator;

function renderElement(element: any, formState: any, setFormState: any, onFieldChange: any) {
  if(element.showCondition && !element.showCondition(formState)) return;

  const Component = element.component;

  let {value, validation} = getFieldState(element, formState);
  const setValue = (value: any) => setField(element, value, formState, setFormState, onFieldChange);
  const validate = () => {
    validateField(element, formState);
    setFormState({...formState});
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
  return (
    <Component key={element.name} {...props}>
      {element.elements && element.elements.map((childElement: any) => renderElement(childElement, formState, setFormState, onFieldChange))}
    </Component>
  );
}

function getFieldState(element: any, formState: any) {
  let value;
  let validation;

  if(formState[element.group]){ 
    value = formState[element.group][element.name]?.value;
    validation = formState[element.group][element.name]?.validation ?? {};
  } else {
    value = formState[element.name]?.value;
    validation = formState[element.name]?.validation ?? {};
  }

  if(value === undefined) {
    if(element.defaultValue) {
      const {group, name} = element; 
      value = element.defaultValue;

      if(element.group){
        if (formState[group] === undefined) formState[group] = {};
        formState[group][name] = {};
        formState[element.group][element.name].value = element.defaultValue;
      } else {
        formState[name] = {};
        formState[name].value = element.defaultValue;
      }
    } else {
      value = '';
    }
  }

  return {value, validation};
}

function setField( element: any, value: any, formState: any, setFormState: any, onFieldChange: any) {
  const {group, name} = element;
  
  if(group){
    if (formState[group] === undefined) formState[group] = {};
    if (formState[group][name] === undefined) formState[group][name] = {};
    
    formState[group][name].value = value;
    if(formState[group][name]?.validation?.error) validateField(element, formState);
  } else {
    if (formState[name] === undefined) formState[name] = {};

    formState[name].value = value;
    if(formState[name]?.validation?.error) validateField(element, formState);
  }
  if(onFieldChange) onFieldChange(`Field ${group || ''}.${name} set to ${value}`, formState);
  setFormState({...formState});
};

function validateField( element: any, formState: any) {
  let error: boolean = false;

  if(element.validations) {
    for(const validate of element.validations) {
      let result: any;
      let value: any;

      if(element.group){
        if (formState[element.group] === undefined) formState[element.group] = {};
        if (formState[element.group][element.name] === undefined) formState[element.group][element.name] = {};

        value = formState[element.group][element.name]?.value;
        result = validate(value);

        formState[element.group][element.name].validation = result;
      } else {
        if (formState[element.name] === undefined) formState[element.name] = {};

        value = formState[element.name]?.value;
        result = validate(value);

        formState[element.name].validation = result;
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

    const elementError = !validateField(element, formState)
    error =  error || elementError;
  }
  return !error;
}
