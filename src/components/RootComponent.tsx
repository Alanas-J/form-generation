function RootComponent({FormPageRender, formState, dispatchFormAction, formConfiguration}: any) {
    return (
        <div className="p-5">
            {FormPageRender}
            <NavButtons {...{formState, dispatchFormAction, formConfiguration}} />
        </div>
    )
}
export default RootComponent;

function NavButtons({formState, dispatchFormAction, formConfiguration}: any){
    const currentPage = formConfiguration.pages[formState.currentPage];

    return (<>
        <button onClick={() => dispatchFormAction({type: 'previous'})} disabled={!currentPage.previous}>Back</button>
        { currentPage.isSubmissionPage ? 
            <button onClick={() => dispatchFormAction({type: 'submit'})}>Submit</button> : <button onClick={() => dispatchFormAction({type: 'next'})} disabled={!currentPage.next}>Next</button>
        }
    </>)
}
