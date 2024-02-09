import { FC } from "react";
import { CounterContext, CounterDispatchContext } from "./CounterContext";
import { useContext } from "react";

const CounterApp: FC = ({ }): JSX.Element => {

    const counter = useContext(CounterContext);
    const dispatch = useContext(CounterDispatchContext);


    function handleIncrement({ by }: { by: number }): void {
        dispatch && dispatch({
            type: 'increment',
            amount: by
        })
    }


    function handleDecrement({ by }: { by: number }): void {
        dispatch && dispatch({
            type: 'decrement',
            amount: by
        })
    }

    return (
        <>
            <h1 data-testid="counter-display">{counter?.counter} </h1>
            <button data-testid="counter-increment-1" onClick={() => handleIncrement({ by: 1 })}> Increment by 1 </button>
            <button data-testid="counter-decrement-1" onClick={() => handleDecrement({ by: 1 })}> Decrement by 1 </button>
            <button data-testid="counter-increment-2" onClick={() => handleIncrement({ by: 2 })}> Increment by 2 </button>
            <button data-testid="counter-decrement-2" onClick={() => handleDecrement({ by: 2 })}> Decrement by 2 </button>
            <span> Incremented: {counter?.incremented} times </span>
            <span> Decremented: {counter?.decremented} times </span>
        </>
    )
}

export default CounterApp;