import { useSelector } from "react-redux";

function Score() {
  const { score, flagsRemaining } = useSelector((state) => state.participant);
  return (
    <div className="title">
      <h2>Score: {score}</h2>
      <h2>Flags Remaining: {flagsRemaining}</h2>
    </div>
  );
}

export default Score;
