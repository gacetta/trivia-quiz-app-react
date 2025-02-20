import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import styles from './GamePage.module.css'

const GamePage = () => {
  const navigate = useNavigate();
  // Retrieve state passed from Landing Page
  const location = useLocation();
  const { categories, difficulty, numQuestions } = location.state;

  // Set up game state
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [resultVisible, setResultVisible] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);

  // Fetch trivia questions based on selected categories, difficulty and numQuestions
  useEffect(() => {
    const fetchQuestions = async () => {
      const category = categories.length > 0 ? `categories=${categories.join(',')}` : ''; // Default to all categories if empty
      const difficultyLevel = difficulty.length > 0 ? `difficulties=${difficulty.join(',')}` : ''; // Default to all difficulties if empty
      const questionsCount = numQuestions > 0 ? `limit=${numQuestions}` : `limit=10`; // Default to 10 questions if not selected
      let url = `https://the-trivia-api.com/v2/questions?`

      if (category) url += `${category}&`
      if (difficultyLevel) url += `${difficultyLevel}&`
      url += questionsCount



      // const category = categories.join(','); // join categories for API query
      // const difficultyLevel = difficulty.join(','); //join difficulties for API query
      // const url = `https://the-trivia-api.com/v2/questions?categories=${category}&difficulties=${difficultyLevel}&limit=${numQuestions}`
      
      try {
        console.log(url)
        const response = await fetch(url)
        const data = await response.json();
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
    if (!selectedAnswer) return; // Prevent submitting without an answer

    const isCorrect = selectedAnswer === questions[currentQuestionIndex].correctAnswer
    setIsAnswerCorrect(isCorrect);
    setResultVisible(true);

    if (isCorrect) {
      setScore(score + 1);
    }
  }

  // Move to the next question
  const handleNextQuestion = () => {
    setResultVisible(false);
    setIsAnswerCorrect(null);
    setSelectedAnswer(null);

    if (currentQuestionIndex + 1 < numQuestions) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setCurrentQuestionIndex(0);
      setScore(0);
      navigate('/');
    }
  };

  // display the current question and options:
  if (questions.length === 0) {
    return <p>Loading questions...</p>
  }

  const currentQuestion = questions[currentQuestionIndex];


  return (
    <div className={styles.pageContainer}>
      <div className={styles.appContainer}>
        <h1 className={styles.title}>Trivia Game</h1>
        <hr className={styles.horizontalBreak} />
        <div className={styles.gameContainer}>
          <div className={styles.gameInfoContainer}>
            <div className={`${styles.attributeBox} ${styles.score}`}>
                <div className={styles.attributeLabel}>Score:</div>
                <div className={styles.attributeValue}>{score}</div>
            </div>
            <div className={styles.attributeBox}>
                <div className={styles.attributeLabel}>Question:</div>
                <div className={styles.attributeValue}>{currentQuestionIndex + 1} / {numQuestions}</div>
            </div>
            <div className={styles.attributeBox}>
                <div className={styles.attributeLabel}>Category:</div>
                <div className={styles.attributeValue}>{currentQuestion.category.replace(/_/g, " ").replace(/\band\b/g, "&").replace(/\b\w/g, (char) => char.toUpperCase())}</div>
            </div>
            <div className={styles.attributeBox}>
                <div className={styles.attributeLabel}>Difficulty:</div>
                <div className={styles.attributeValue}>{currentQuestion.difficulty.replace(/\b\w/g, (char) => char.toUpperCase())}</div>
            </div>
        </div>
          <hr className={styles.horizontalBreak} />

          <div className={styles.questionContainer}>
            <h3 className={styles.question}>{currentQuestion.question.text}</h3>
            <div className={styles.choicesContainer}>
              {currentQuestion.incorrectAnswers.concat(currentQuestion.correctAnswer).sort().map((answer, index) => {
                // Check if the current answer is correct and if it was selected
                const isCorrect = answer === currentQuestion.correctAnswer;
                const isSelected = selectedAnswer === answer;
                const isIncorrect = resultVisible && !isCorrect;

                return (
                  <label 
                    key={index} 
                    className={`${styles.choice} 
                      ${resultVisible ? (isCorrect ? styles.correct : (isIncorrect ? styles.incorrect : '')) : ''}
                      ${isSelected && !resultVisible ? styles.selected : ''}`}
                  >
                    <input
                      type="radio"
                      value={answer}
                      checked={selectedAnswer === answer}
                      onChange={handleAnswerChange}
                      disabled={resultVisible} // Disable selection after submission
                    />
                    {answer}
                  </label>
                );
              })}
            </div>
            {!resultVisible && <button className={styles.button} onClick={handleSubmitAnswer} disabled={!selectedAnswer}>Submit Answer</button>}
          </div>


          {/* Show feedback after answer is submitted */}
          {resultVisible && (
            <div>
              <p style={{ color: isAnswerCorrect ? 'green' : 'red' }}>
                {isAnswerCorrect ? "Correct! 🎉" : "Incorrect 😞"}
              </p>
              <button className={styles.button} onClick={handleNextQuestion}>
                {currentQuestionIndex + 1 < numQuestions ? "Next Question" : "New Game"}
              </button>
            </div>
          )}  

        </div>
          <nav>
          <Link to='/'>
              <button className={styles.button}>Start A New Game</button>
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default GamePage;