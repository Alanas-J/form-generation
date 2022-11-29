import { FormActionDispatch } from "../library/form-generation/types";

// TODO: Add props expectations
function RootComponent({FormPageRender, formState, dispatchFormAction, formConfiguration}: any) {
    return (
        <div className="p-5">
            {FormPageRender}
            <NavButtons {...{formState, dispatchFormAction, formConfiguration}} />

            {formState._submissionState === 'submitting' && <SubmissionModal/>}
            {formState._submissionState === 'complete' && <SubmitCompleteModal dispatchFormAction={dispatchFormAction} />}
        </div>
        
    )
}
export default RootComponent;

function NavButtons({formState, dispatchFormAction, formConfiguration}: any){
    const currentPage = formConfiguration.pages[formState._currentPage];

    return (
    <>
        <button onClick={() => dispatchFormAction({type: 'previous'})} disabled={!currentPage.previous}>Back</button>
        { currentPage.isSubmissionPage ? 
            <button onClick={() => dispatchFormAction({type: 'submit'})}>Submit</button> : <button onClick={() => dispatchFormAction({type: 'next'})} disabled={!currentPage.next}>Next</button>
        }
    
        
    </>)
}

function SubmissionModal() {
    const modalStyle: any = { backgroundColor: '#000000AA'};

    return(
        <div className='modal fade show d-block' tabIndex={-1} role="dialog" style={modalStyle}>
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h4 className="form-label">Submitting</h4>
                </div>
                <div className="modal-body">
                    <div className="d-flex align-items-center">
                        <div className="me-3">Pretending to submit now for 10 seconds... </div>
                        <div className="spinner-border ml-auto" role="status" aria-hidden="true"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

function SubmitCompleteModal( {dispatchFormAction}: any) {
    const modalStyle: any = { backgroundColor: '#000000AA'};

    return(
        <div className='modal fade show d-block' tabIndex={-1} role="dialog" style={modalStyle}>
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <h4 className="form-label p-3">The fake submission is now complete</h4>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={() => dispatchFormAction({type: 'reset-form'})}>Reset Form</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
