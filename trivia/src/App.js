import Category from './components/Category'
import './App.css';
import { useEffect, useState } from 'react'
import axios from 'axios'


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
  const getQuestion = () => {
    console.log('making api call')
    axios
      .get('https://opentdb.com/api.php?amount=1&category=9')
      .then((response) => {
        console.log(response.data)
        setQuestion(response.data.results[0])
      })
  }
  return (
    <div>
      <div className="App">
        <header className="App-header">
          <h1 onClick={() => setQuestion(null)}>Trivia</h1>
        </header>
      </div>
      <div>
        <p>Directions for game</p>
      </div>
      <div>
        {question ? <div>Here's the question</div> : 
        (<ul>
          {categories.map((category, index) => (
            <Category name={category.name} key={index} onClick={() => {
              getQuestion()}}/>
          ))}
        </ul>)}
      </div>
    </div>
  );
}

export default App;

