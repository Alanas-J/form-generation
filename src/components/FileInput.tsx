import { useEffect, useRef } from "react";

function FileInput({ name, additionalProps, value, setValue, validation, validate }: any){
    const inputClasses = `form-control ${validation.error && 'is-invalid'}`;

    const fileInput = useRef<any>({});
    useEffect(() => {
        if(fileInput) fileInput.current.files = value;
    })

    return (
        <div className="mb-3 mx-3">
            <label className="form-label">{additionalProps.label}</label>
            <input ref={fileInput} className={inputClasses} type="file" name={name} onChange={ e => {setValue(e.target.files); console.log(e.target)}}/>
            <div className="invalid-feedback">
                {validation.message || 'undefined'}
            </div>
        </div>
    );
}
export default FileInput;
  