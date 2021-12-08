import { useState } from "react";

const Question = (props) => {
    const [isCorrect, setIsCorrect] = useState(null);
    const allAnswers = [props.correctAnswer];
    props.incorrectAnswers.forEach((incorrectAnswer) => {
        allAnswers.push(incorrectAnswer);
    });
    const onClick = (text) => {
        console.log(text, props.correctAnswer)
        if (text === props.correctAnswer) {
            setIsCorrect(true);
        } else {
            setIsCorrect(false);
        }
    };
    return (
        <>
            <h3>{props.question}</h3>
            {allAnswers.sort().map((answer, index) => (
                <div onClick={() => onClick(answer)}>{answer}</div>
            ))}
            {isCorrect === true && <div>You are correct!!</div>}
            {isCorrect === false && <div>You incorrect!!</div>}
        </>
    );
};

export default Question;
