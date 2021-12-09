import Category from './components/Category'
import './App.css';
import { useEffect, useState } from 'react'
import axios from 'axios'
import Question from './components/Question'


const App = () => {
  // setting up variables for State data to store in components catergories and questions
  // setting the categories useState to an empty array because we havent fetched categories yet
  const [categories, setCategories] = useState([])
  // setting the question useState to null because we have not fetched a question from the question api yet so there isnt any data yet
  const [question, setQuestion] = useState(null)
  // 
  const [score, setScore] = useState(0)
  // fetch call to the category api, happens only once when the page loads
  useEffect(() => {
    axios
      .get('https://opentdb.com/api_category.php')
      .then((response) => {
        setCategories(response.data.trivia_categories)
      })
  }, [])
  // set up a helper function to call the api to be able to pass this helper function to child components later
  // passed and id to the getQuestion function as a parameter for our users to click on a category and questions to be populated from the that category only
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
      <h3>Welcome to Trivia Night!! Below are several categories that you can choose your trivia questions to generate from. Your questions will have four multiple choice answers below it for you to select from. At any time you can return to the home screen by pressing the home button under the answers. Good luck!!!</h3>
      </div> 
      <div>
      {/* Ternary Operator to handle the question view. This switches between the question and the category view. If the question has data then it will change the view to the question view and list out the answers. If not this will continue to show the category list ul... */}
        {question ? <Question question={question.question} correctAnswer={question.correct_answer} incorrectAnswers={question.incorrect_answers} incrementScore={()=> {
          setScore(score + 1)
        }}
        decrementScore={() => {
          setScore(score - 1)
        }}/>: 
        (<ul className="category_list">
          {categories.map((category, index) => (
            <Category name={category.name} key={index} onClick={() => {
              // made the getQuestion to a helper function so we could call it once someone clicks a category
              getQuestion(category.id)}}/>
          ))}
          
        </ul>)}  
        {/* added a button for the user to go back to the home page after a question was rendered. To do this we had to change the state to null. This conditional rendering below will only appear if a question is present */}
        <div className="home_container">
          {question && <button className="home" onClick={() => setQuestion(null)}>Home</button>}
        </div>
      </div>
      <div className="score">
        Score: {score}
      </div>
      
    </div>
  );
}

export default App;

