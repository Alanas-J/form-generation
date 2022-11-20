import { useState } from "react";

function RadioModal({name, group, value, setValue, additionalProps, formState, setFormState}: any) {

    let isHidden;
    if (group) { // TODO: I should really make reusable code for this or stop lazy initing
        if(formState[group] === undefined) formState[group] = {}; 
        if(formState[group][name] === undefined) formState[group][name] = {}; 
        isHidden = formState[group][name].isHidden;
    } else {
        if(formState[name] === undefined) formState[name] = {}; 
        isHidden = formState[name].isHidden;
    }

    const modalStyle: any = { backgroundColor: '#000000AA'}
    modalStyle.display = isHidden ? 'none' : 'block';

    function setIsHidden(value: boolean) {
        if (group) {
            formState[group][name].isHidden = value;
        } else {
            formState[name].isHidden = value;
        }
        setFormState({...formState});
    }

    return (
        <div className={'modal fade '+(!isHidden && 'show')} tabIndex={-1} role="dialog" style={modalStyle}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h4 className="form-label">{additionalProps.label}</h4>
                </div>
                <div className="modal-body">
                    {additionalProps.options.map((option: string, index: number) => {
                        return (
                            <div key={index} className="form-check">
                                <input className="form-check-input" type="radio" name={name} value={option} checked={value === option} onChange={e => setValue(e.target.value)}/>
                                <label className="form-check-label">
                                    {option}
                                </label>
                            </div>
                        );
                })}
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => setIsHidden(true)}>Ok</button>
                </div>
                </div>
            </div>
        </div>
    )
}    
    
export default RadioModal;
  