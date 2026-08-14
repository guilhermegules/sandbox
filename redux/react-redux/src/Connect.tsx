import { connect } from "react-redux";

const increment = () => ({ type: "INCREMENT" });

export function Connect(props: any) {
  return (
    <div>
      <p>counter: {props.counter}</p>{" "}
      <button onClick={() => props.increment()}>Increment</button>
    </div>
  );
}

const mapStateToProps = (state: number) => ({ counter: state });

const mapDispatchToProps = { increment };

// eslint-disable-next-line react-refresh/only-export-components
export default connect(mapStateToProps, mapDispatchToProps)(Connect);
