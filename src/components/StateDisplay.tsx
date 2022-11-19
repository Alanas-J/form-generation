function StateDisplay({ formState }: any) {
    return (
      <div className="mb-3 p-3 shadow">
        Form State:
        <pre>
            {JSON.stringify(formState, null, 4)}
        </pre>
      </div>
    )}
    
  export default StateDisplay;
  