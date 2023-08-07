import React from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import { useEffect, useReducer } from "react";
import StartScreen from "./StartScreen";
import Question from "./Question";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import NextButton from "./NextButton";
import Footer from "./Footer";
import Timer from "./Timer";
const SECS_PER_QUESTION = 30;
const initalState = {
    questions: [],
    //Loading,"error","ready","active","finished"
    status: "Loading",
    index: 0,
    answer: null,
    points: 0,
    highscore: 0,
    secondsRemaining: null,
};
function reducer(state, action) {
    switch (action.type) {
        case "dataReceived":
            return { ...state, questions: action.payload, status: "ready" };

        case "dataFailed":
            return { ...state, status: "error" };
        case "start":
            return {
                ...state,
                status: "active",
                secondsRemaining: SECS_PER_QUESTION * state.questions.length,
            };
        case "newAnswer":
            const question = state.questions.at(state.index);
            return {
                ...state,
                answer: action.payload,
                points:
                    action.payload === question.correctOption
                        ? state.points + question.points
                        : state.points,
            };
        case "nextQuestion":
            return { ...state, index: state.index + 1, answer: null };
        case "finish":
            return {
                ...state,
                status: "finished",
                highscore:
                    state.points > state.hightscore
                        ? state.points
                        : state.hightscore,
            };
        case "restart":
            return {
                ...initalState,
                questions: state.questions,
                status: "ready",
            };

        case "tick":
            return {
                ...state,
                secondsRemaining: state.secondsRemaining - 1,
                status:
                    state.secondsRemaining === 0 ? "finished" : state.status,
            };
        default:
            throw new Error("Action is unkown");
    }
}
export default function App() {
    const [
        {
            questions,
            status,
            index,
            answer,
            points,
            highscore,
            secondsRemaining,
        },
        dispatch,
    ] = useReducer(reducer, initalState);
    const numQuestions = questions.length;
    const maxPossiblePoints = questions.reduce(
        (prev, curr) => prev + curr.points,
        0
    );
    useEffect(function () {
        fetch("http://localhost:8000/questions")
            .then((res) => res.json())
            .then((data) => dispatch({ type: "dataReceived", payload: data }))
            .catch((err) => dispatch({ type: "dataFailed" }));
    }, []);
    return (
        <div className="app">
            <Header />
            <Main>
                {status === "Loading" && <Loader />}
                {status === "error" && <Error />}
                {status === "ready" && (
                    <StartScreen
                        numQuestions={numQuestions}
                        dispatch={dispatch}
                    />
                )}
                {status === "active" && (
                    <>
                        <Progress
                            index={index}
                            numQuestions={numQuestions}
                            points={points}
                            maxPossiblePoints={maxPossiblePoints}
                            answer={answer}
                        />
                        <Question
                            question={questions[index]}
                            dispatch={dispatch}
                            answer={answer}
                        />
                        <Footer>
                            <Timer
                                dispatch={dispatch}
                                secondsRemaining={secondsRemaining}
                            />
                            <NextButton
                                answer={answer}
                                dispatch={dispatch}
                                numQuestions={numQuestions}
                                index={index}
                            />
                        </Footer>
                    </>
                )}
                {status === "finished" && (
                    <FinishScreen
                        points={points}
                        maxPossiblePoints={maxPossiblePoints}
                        highscore={highscore}
                        dispatch={dispatch}
                    />
                )}
            </Main>
        </div>
    );
}
