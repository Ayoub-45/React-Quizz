import { useQuiz } from "../contexts/QuizContext";
import Options from "./Options";
function Question() {
   const {question}=useQuiz()
    return (
        <div>
            <h4>{question.question}</h4>
            <Options question={question}/>     
        </div>
    );
}
export default Question;
