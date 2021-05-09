function Score(props) {
  return (
    <div className="title">
      <h2>Score: {props.userState.points}</h2>
      <h2>Flags Remaining: {props.userState.flagsRemaining}</h2>
    </div>
  );
}

export default Score;
