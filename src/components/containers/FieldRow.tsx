import { FormElementProps } from "../../library/form-generation/types"

function FieldRow({children}: FormElementProps) {
    return (
        <div className="d-flex mb-3">
            {children}
        </div>
    )
}

export default FieldRow