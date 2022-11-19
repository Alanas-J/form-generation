
// Returns a isMandatory function with the definited errorMessage.
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

export {isMandatory}