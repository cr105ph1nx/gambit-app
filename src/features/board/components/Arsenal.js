import { useSelector } from "react-redux";

function Arsenal(props) {
  const { arsenal } = useSelector((state) => state.participant);

    return (
      <div className="title">
        <h2>Arsenal:</h2>
        {arsenal.map((piece, index) => (
          <div key={index}>
            <h3>
              - {piece.name} ({piece.number})
            </h3>
          </div>
        ))}
      </div>
    );
  }
  
  export default Arsenal;
  