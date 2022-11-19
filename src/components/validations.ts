
// Returns a isMandatory function with the defined errorMessage.
const isMandatory = (errorMessage: string) => {
    return (value: string | undefined) => {
        if(value === '' || value === undefined) {
            return { 
                error: true, 
                message: errorMessage
            }
        } else {
            return { 
                error: false 
            };
        }
    };
};

// Returns a defined regex checker with defined error message
const checkRegex = (errorMessage: string, regex: RegExp) => {
    return (value: string | undefined) => {
        if(value === undefined) value = '';

        console.log(value, regex.test(value));
        if(value && regex.test(value)){
            
            return { 
                error: false 
            };
        } else {
            return { 
                error: true, 
                message: errorMessage
            }
        }
    };
};

export {isMandatory, checkRegex}