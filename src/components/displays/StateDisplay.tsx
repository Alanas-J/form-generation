import { FormElementProps } from "../../library/form-generation/types";

function StateDisplay({ formState }: FormElementProps) {
    return (
      <div className="mb-3 p-3 shadow">
        Form State:
        <pre>
            {JSON.stringify(formState, null, 4)}
            <div>
              *File objects are not compatible with JSON.stringify, check console.log
            </div>
        </pre>
      </div>
    )}
    
  export default StateDisplay;
  