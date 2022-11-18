import { useState } from 'react';

class FormGenerator {
    formElements: any = []; // TODO: Make a FormElement interface.
    // onSubmit, onStep event listeners in the future.
  
    generate(): any {
      return () => {
        const [state, setState] = useState<any>({});
        console.log(state);
  

        const FormComponent = (
          <>
             { 
              this.formElements.map((field: any) => {
                const Component = field.component
                const props = {
                  name: field.name,
                  state,
                  setState
                }
                return (<Component key={field.name} {...props}/>);
              })
            }
          </>
        );

      return { FormComponent }
    }

  }
}
export default FormGenerator;
