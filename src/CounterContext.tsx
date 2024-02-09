import { createContext, useReducer } from 'react';

interface Counter {
    counter: number, incremented: number, decremented: number
}

interface Action {
    type: string,
    amount: number
}

export const CounterContext = createContext<Counter | null>(null);
export const CounterDispatchContext = createContext<React.Dispatch<any> | null>(null);

export function CounterProvider({ children }: { children: React.ReactNode }) {
    const [counter, dispatch] = useReducer(counterReducer, initialCounter);

    return (
        <CounterContext.Provider value={counter}>
            <CounterDispatchContext.Provider value={dispatch}>
                {children}
            </CounterDispatchContext.Provider>
        </CounterContext.Provider>
    );
}

function counterReducer(state: Counter, action: Action) {
    switch (action.type) {
        case 'increment': {
            return {
                ...state,
                counter: state.counter + action.amount,
                incremented: state.incremented + action.amount,
            };
        }
        case 'decrement': {
            return {
                ...state,
                counter: state.counter - action.amount,
                decremented: state.decremented + action.amount,
            };
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}

const initialCounter = { counter: 0, incremented: 0, decremented: 0 };
