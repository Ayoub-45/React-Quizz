import { useQuiz } from "../contexts/QuizContext";

function Options({question}) {
    const {dispatch,answer}=useQuiz()
    return (
        <div className="options">
            {question.options.map((option, index) => {
                const hasAnswered = answer !== null;
                return (
                    <button
                        key={option}
                        className={`btn btn-option ${
                            index === answer ? "answer" : ""
                        } ${
                            hasAnswered
                                ? index === question.correctOption
                                    ? "correct"
                                    : "wrong"
                                : ""
                        }`}
                        disabled={hasAnswered}
                        onClick={() =>
                            dispatch({ type: "newAnswer", payload: index })
                        }
                    >
                        {option}
                    </button>
                );
            })}
        </div>
    );
}
export default Options;
