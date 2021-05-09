function Arsenal(props) {
    return (
      <div className="title">
        <h2>Arsenal:</h2>
        {props.userState.arsenal.map((piece, index) => (
          <div key={index}>
            <h3>
              - {piece.name} ({piece.number})
            </h3>
          </div>
        ))}
        <p>PS: click on the red case to begin your adventure!</p>
      </div>
    );
  }
  
  export default Arsenal;
  