import Category from './components/Category'
import './App.css';
import { useEffect, useState } from 'react'
import axios from 'axios'
import Question from './components/Question'


const App = () => {
  const [categories, setCategories] = useState([])
  const [question, setQuestion] = useState(null)
  useEffect(() => {
    axios
      .get('https://opentdb.com/api_category.php')
      .then((response) => {
        setCategories(response.data.trivia_categories)
      })
  }, [])
  const getQuestion = (id) => {
    console.log('making api call')
    axios
      .get(`https://opentdb.com/api.php?amount=1&category=${id}`)
      .then((response) => {
        setQuestion(response.data.results[0])
      })
  }
  return (
    <div>
      <div className="App">
        <header className="App-header">
          <h1>Trivia Night</h1>
        </header>
      </div>
      <div className="directions">
        <h3>Welcome to Trivia Night!! Below are several categories that you can choose your trivia questions to generate from. Your questions will have four multiple choice answers below it for you to select from. At any time you can return to the home screen by pressing the home button in the top right hand corner of your screen. Good luck!!!</h3>
      </div>
      <div>
      <button className="home" onClick={() => setQuestion(null)}>Home</button>
        {question ? <Question question={question.question} correctAnswer={question.correct_answer} incorrectAnswers={question.incorrect_answers}/>: 
        (<ul className="category_list">
          {categories.map((category, index) => (
            <Category name={category.name} key={index} onClick={() => {
              getQuestion(category.id)}}/>
          ))}
        </ul>)}
      </div>
    </div>
  );
}

export default App;

