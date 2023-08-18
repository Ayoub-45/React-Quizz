import { useQuiz } from "../contexts/QuizContext";

export default function NextButton() {
    const {answer,dispatch,numQuestions,index}=useQuiz()
    if (answer === null) return null;
    if (index < numQuestions - 1)
        return (
            <button
                className="btn btn-ui"
                onClick={() => dispatch({ type: "nextQuestion" })}
            >
                next
            </button>
        );
    if(index===numQuestions-1)
    return (
        <button
            className="btn btn-ui"
            onClick={() => dispatch({ type: "finish" })}
        >
            Finish
        </button>
        )
}
