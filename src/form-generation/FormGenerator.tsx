import { useState } from 'react';

class FormGenerator {
  startOn: string = '';
  sections: any;

  // Events
  onStep: any;
  onSubmit: any;
  // onSubmit, onStep event listeners in the future.
  
  generate(): any {
    // Variables/hooks to export can be placed here
    let _formState: any = null;
    let _setFormState: any = null;

    const FormComponent = () => {
      const [formState, setFormState] = useState<any>({_section: this.startOn});
      _setFormState = setFormState;
      _formState = formState;
      
      const setField = (name: string, value: any, group: string|undefined = undefined) => {
        if(group){
          if (formState[group] === undefined) formState[group] = {};
          if (formState[group][name] === undefined) formState[group][name] = {};

          formState[group][name].value = value;
        } else {
          if (formState[name] === undefined) formState[name] = {};
          formState[name].value = value;
        }
        console.log(`Field ${group || ''}.${name} set to ${value}`, formState);
        setFormState({...formState});
      };

      return (
        <>
          { 
            this.sections[formState._section].elements.map((element: any) => {
              const Component = element.component;

              const setValue = (value: any) => {
                setField(element.name, value, element.group);
              }
              let value = '';
              let validation = {};
              if(formState[element.group]){
                value = formState[element.group][element.name]?.value ?? '';
                validation = formState[element.group][element.name]?.validation ?? {};
              } else {
                value = formState[element.name]?.value ?? '';
                validation = formState[element.name]?.validation ?? {};
              }
              
              const props = {
                ...element,
                value,
                setValue,
                formState,
                setFormState,
                validation
                // TODO: add a validate() function
              }
              return (<Component key={element.name} {...props}/>);
            })
          }
        </>
      );
    };

    const formAction = (action: string) => {
      switch(action) {
        case 'next':
          if (_setFormState && this.sections[_formState._section].next) {
            if(validateAllFields(this.sections[_formState._section].elements, _formState, _setFormState)) {

              const formState = { ..._formState, _section: this.sections[_formState._section].next};
             _setFormState(formState)

             if(this.onStep) this.onStep(formState);
            }
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

function validateAllFields(elements: any, formState: any, setFormState: any): boolean {
  let error: boolean = false;

  elements.forEach((element: any) => {
    if(element.validations){
      for(const validate of element.validations){
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
          error = error || result.error
          break;
        }
      }
    }
  })

  if(error) setFormState({...formState});
  return !error;
}