import { useState } from 'react';

class FormGenerator {
  startOn: string = '';
  sections: any;
  // onSubmit, onStep event listeners in the future.
  
  generate(): any {
    // Variables/hooks to export can be placed here
    const FormComponent = () => {
      const [formState, setFormState] = useState<any>({
        _section: this.startOn
      });
      
      const setField = (name: string, value: any, group: string|undefined = undefined) => {
        if(group){
          if (formState[group] === undefined) formState[group] = {};
          if (formState[group][name] === undefined) formState[group][name] = {};

          formState[group][name].value = value;
        } else {
          if (formState[name] === undefined) formState[name] = {};
          formState[name].value = value;
        }
        console.log(formState);
        setFormState({...formState});
      }
  
      return (
        <>
          { 
            this.sections[formState._section].elements.map((element: any) => {
              const Component = element.component;

              const setValue = (value: any) => {
                setField(element.name, value, element.group);
              }
              let value = '';
              if(formState[element.group]){
                value = formState[element.group][element.name]?.value ?? '';
              } else {
                value = formState[element.name]?.value ?? '';
              }
              
              const props = {
                ...element,
                value,
                setValue,
                formState,
                setFormState
              }
              return (<Component key={element.name} {...props}/>);
            })
          }
        </>
      );
    };
    return { FormComponent }
  }
}
export default FormGenerator;
