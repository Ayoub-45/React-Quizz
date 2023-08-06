import Options from "./Options";
function Question({ question ,dispatch,answer}) {
    const hasAnswered = answer !== null;
    return (
        <div>
            <h4>{question.question}</h4>
            <Options question={question} dispatch={dispatch} answer={answer} />     
            {hasAnswered && <button className="btn btn-ui" onClick={()=>dispatch({type:"nextQuestion"})}>next</button>}       
        </div>
    );
}
export default Question;
