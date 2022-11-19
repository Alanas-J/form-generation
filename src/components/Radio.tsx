function Radio({name, value, setValue, additionalProps}: any) {
  
    return (
        <div className="my-3">
            <label className="form-label">{additionalProps.label}</label>

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
    )
}    
    
export default Radio;
  