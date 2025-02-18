import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom'

const GamePage = () => {
  // Retrieve state passed from Landing Page
  const location = useLocation();
  const { categories, difficulty, numQuestions } = location.state;

  // Set up game state
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  // Fetch trivia questions based on selected categories, difficulty and numQuestions
  useEffect(() => {
    const fetchQuestions = async () => {
      const category = categories.join(','); // join categories for API query
      const difficultyLevel = difficulty.join(','); //join difficulties for API query
      const url = `https://the-trivia-api.com/v2/questions?categories=${category}&difficulty=${difficultyLevel}&limit=${numQuestions}`
      
      try {
        const response = await fetch(url)
        const data = await response.json();
        console.log(data)
        setQuestions(data);
      } catch (error) {
        console.error('Error fetching questions: ', error)
      }
    };

    fetchQuestions();
  }, [categories, difficulty, numQuestions])

  // handle answer selection
  const handleAnswerChange = (event) => {
    setSelectedAnswer(event.target.value);
  };

  // check the answer and move to next questions
  const handleSubmitAnswer = () => {
    if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }
    setSelectedAnswer(null); // reset answer for next question
    setCurrentQuestionIndex(currentQuestionIndex + 1); // move to next question
  }

  // display the current question and options:
  if (questions.length === 0) {
    return <p>Loading questions...</p>
  }

  const currentQuestion = questions[currentQuestionIndex];


  return (
    <div>
      <h1>Trivia Game</h1>
      <div>
        <p>Score: {score}</p>
        <p>Question {currentQuestionIndex + 1} / {numQuestions}</p>
        <p>Category: {currentQuestion.category}</p>
        <p>Difficulty: {currentQuestion.difficulty}</p>

        <div>
          <h3>{currentQuestion.question.text}</h3>
          {currentQuestion.incorrectAnswers.concat(currentQuestion.correctAnswer).sort().map((answer, index) => (
            <label key={index}>
              <input
                type="radio"
                value={answer}
                checked={selectedAnswer === answer}
                onChange={handleAnswerChange}
              />
              {answer}
            </label>
          ))}
        </div>

        <button onClick={handleSubmitAnswer}>Submit Answer</button>
        <nav>
        <Link to='/'>
            <button>To LandingPage.jsx</button>
        </Link>
      </nav>
      </div>
    </div>
  );
};

//   return (
//     <div>
//       <h1>Trivia Game</h1>
//       {/* Add your question and answer choices here */}
//       <button>Submit Answer</button>
//     </div>
//   );
// };

export default GamePage;