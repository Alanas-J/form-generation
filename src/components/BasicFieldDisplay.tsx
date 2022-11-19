function BasicFieldDisplay({ name, value }: any) {
    return (
      <div className="mb-3">
        <div className="d-flex">
            <div className="mx-3">{name}</div>
            <div className="mx-3">{value}</div>
        </div>
      </div>
    )}
    
  export default BasicFieldDisplay;
  