import { useState } from "react";

function RadioModal({field, value, setValue, componentProps, formState, setFormState}: any) {
    let isHidden;
    
    if(field) {
        const keys = field.split('.');

        let currentNode = formState;
        let nodeIsUndefined = false;
        for(const key of keys) {
            if (currentNode[key] === undefined) {
                nodeIsUndefined = true;
                break;
            }
            currentNode = currentNode[key];
        }
        if(!nodeIsUndefined){
            isHidden = currentNode?.isHidden;
        }
    } 
    else {
        console.error('You need to provide field key in order to use the hide modal functionality.')
    }     

    function setIsHidden(value: boolean) {
        if(field) {
            const keys = field.split('.');
    
            let currentNode = formState;
            for(const key of keys) {
                if (currentNode[key] === undefined) currentNode[key] = {};
                currentNode = currentNode[key];
            }

            currentNode.isHidden = value;
            setFormState({...formState});
        } 
        else {
            console.error('You need to provide field key in order to use the hide modal functionality.')
        }     
    }

    const modalStyle: any = { backgroundColor: '#000000AA'}
    modalStyle.display = isHidden ? 'none' : 'block';

    return (
        <div className={'modal fade '+(!isHidden && 'show')} tabIndex={-1} role="dialog" style={modalStyle}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h4 className="form-label">{componentProps.label}</h4>
                </div>
                <div className="modal-body">
                    {componentProps.options.map((option: string, index: number) => {
                        return (
                            <div key={index} className="form-check">
                                <input className="form-check-input" type="radio" value={option} checked={value === option} onChange={e => setValue(e.target.value)}/>
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
