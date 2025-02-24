import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LandingPage.module.css';

const LandingPage = () => {
  const navigate = useNavigate();
  const CATEGORY_LIST = [
    'music',
    'sport_and_leisure',
    'film_and_tv',
    'arts_and_literature',
    'history',
    'society_and_culture',
    'science',
    'geography',
    'general_knowledge',
  ];
  const DIFFICULTY_LIST = ['easy', 'medium', 'hard'];

  // Manage State - categories, difficulty, numQuestions
  const [categories, setCategories] = useState(CATEGORY_LIST);
  const [difficulty, setDifficulty] = useState(DIFFICULTY_LIST);
  const [numQuestions, setNumQuestions] = useState(10);
  const [allCategories, setAllCategories] = useState(true);
  const [allDifficulties, setAllDifficulties] = useState(true);

  // Handle Category Change (checkboxes)
  const handleCategoryChange = (event) => {
    const value = event.target.value;
    setCategories((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  // Handle Category Toggle (Select All or None)
  const handleCategoryToggle = (event) => {
    event.preventDefault();
    setCategories(allCategories ? [] : CATEGORY_LIST);
    setAllCategories(!allCategories);
  };

  // Handle Difficulty Change (checkboxes)
  const handleDifficultyChange = (event) => {
    const value = event.target.value;
    setDifficulty((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  // Handle Difficulty Toggle (Select All or None)
  const handleDifficultyToggle = (event) => {
    event.preventDefault();
    setDifficulty(allDifficulties ? [] : DIFFICULTY_LIST);
    setAllDifficulties(!allDifficulties);
  };

  // Handle number of questions (dropdown)
  const handleNumQuestionsChange = (event) => {
    setNumQuestions(event.target.value);
  };

  // On form submission, navigate to the game page and pass data
  const handleStartGame = (event) => {
    event.preventDefault();

    const selectedNumQuestions = numQuestions ? numQuestions : 10;

    // on button press, navigate to the GamePage and pass selected state
    navigate('/game', {
      state: {
        categories,
        difficulty,
        numQuestions: selectedNumQuestions,
      },
    });
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.appContainer}>
        <h1 className={styles.title}>Trivia Quiz!</h1>
        <form className={styles.form} onSubmit={handleStartGame}>
          {/* Categories */}
          <div className={styles.landingHeaders}>
            <h3 className={styles.subheader}>Categories:</h3>
            <p className={styles.requirements}>(must select at least one)</p>
          </div>
          <div className={styles.checkboxGroup}>
            {CATEGORY_LIST.map((cat) => (
              <label key={cat} className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  value={cat}
                  checked={categories.includes(cat)}
                  onChange={handleCategoryChange}
                  className={styles.checkbox}
                />
                {cat
                  .replace(/_/g, ' ')
                  .replace(/\band\b/g, '&')
                  .replace(/\b\w/g, (char) => char.toUpperCase())}
              </label>
            ))}
          </div>
          <button
            className={styles.toggleButton}
            onClick={handleCategoryToggle}
          >
            ✔ {allCategories ? 'None' : 'All'}
          </button>
          {/* Difficulty */}
          <div className={styles.landingHeaders}>
            <h3 className={styles.subheader}>Difficulties:</h3>
            <p className={styles.requirements}>(must select at least one)</p>
          </div>
          <div className={styles.difficultyContainer}>
            <div className={styles.difficultyGroup}>
              {DIFFICULTY_LIST.map((level) => (
                <label key={level} className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    value={level}
                    checked={difficulty.includes(level)}
                    onChange={handleDifficultyChange}
                    className={styles.checkbox}
                  />
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </label>
              ))}
              <button
                className={styles.toggleButton}
                onClick={handleDifficultyToggle}
              >
                ✔ {allDifficulties ? 'None' : 'All'}
              </button>
            </div>
          </div>
          {/* NumQuestions */}
          <div className={styles.numQuestionContainer}>
            <h3 className={styles.subheader} htmlFor="numQuestionsInput">
              Number of Questions:
            </h3>
            <select
              className={styles.select}
              name="numQuestions"
              id="numQuestionsInput"
              value={numQuestions}
              onChange={handleNumQuestionsChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="25">25</option>
              <option value="30">30</option>
            </select>
            {/* <input 
                        id='numQuestionsInput'
                        list="numQuestionsValues" 
                        className={styles.numQuestionSelector} 
                        value={numQuestions} 
                        onChange={handleNumQuestionsChange}
                        autoComplete='off'
                    />
                        <datalist id="numQuestionsValues">
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                        </datalist> */}
          </div>
          <button className={styles.button} type="submit">
            Start New Game
          </button>
        </form>
      </div>
    </div>
  );
};

export default LandingPage;
