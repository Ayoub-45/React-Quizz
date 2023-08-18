import React from "react"
function StartScreen({numQuestions,dispatch}){
    return(
        <div className="start">
            <h2>Welcome to the React Quizz!</h2>
            <h3>{numQuestions} questions to test your React mastery</h3>
            <button className="btn btn-ui" onClick={()=>dispatch({type:"start"})}>Let's start</button>
            </div>
    )
}
export default StartScreen