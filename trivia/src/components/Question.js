import { useState } from "react";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";

const Question = (props) => {
    const [isCorrect, setIsCorrect] = useState(null);
    const { width, height } = useWindowSize();
    const allAnswers = [props.correctAnswer];
    // this is taking all the incorrect and correct answers and individually pushing them into the new variable allAnswers
    props.incorrectAnswers.forEach((incorrectAnswer) => {
        allAnswers.push(incorrectAnswer);
    });
    // set up a helper function so when a user clicks a selection it will know which item was clicked and then check against whether that answer was correct or incorrect
    const onClick = (text) => {
        console.log(text, props.correctAnswer);
        if (text === props.correctAnswer) {
            setIsCorrect(true);
            props.incrementScore();
        } else {
            setIsCorrect(false);
            props.decrementScore();
        }
    };
    return (
        <>
            <h3 className="question">{props.question}</h3>
            <div className="answers_container">
                {allAnswers.sort().map((answer, index) => (
                    <button className="answers" onClick={() => onClick(answer)}>
                        {answer}
                    </button>
                ))}
                {/* adding prompts to the UI to let a user know whether or not their selection was correct or incorrect */}
                {isCorrect === true && (
                    <>
                        <Confetti width={width} height={height} />
                        <div>You are correct!!</div>
                    </>
                )}
                {isCorrect === false && <div>You incorrect!!</div>}
            </div>
        </>
    );
};

export default Question;
