import React from "react";
import Header from "./Header";
import Main from "./Main";
import { useEffect, useReducer } from "react";
const initalState = {
    questions: [],
    //Loading,"error","ready","active","finished"
    status:"Loading"
};
function reducer(state, action) {
    switch(action.type){
        case "dataReceived":
            return {...state,questions:action.payload,status:"ready"}
        
        case "dataFailed":
            return {...state,status:"error"};
        default:
            throw new Error("Action is unkown")
    }
}
export default function App() {
    const [state, dispatch] = useReducer(reducer, initalState);
    useEffect(function () {
        fetch("http://localhost:8000/questions")
            .then((res) => res.json())
            .then((data) => dispatch({type:"dataReceived",payload:data}))
            .catch((err) => dispatch({type:"dataFailed"}));
    }, []);
    return (
        <div className="app">
            <Header />
            <Main>
                <p>1/15</p>
                <p>Question</p>
            </Main>
        </div>
    );
}
