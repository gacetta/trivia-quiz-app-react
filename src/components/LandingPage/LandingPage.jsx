import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LandingPage.module.css'

const LandingPage = () => {
    const navigate = useNavigate();

    // Manage State - categories, difficulty, numQuestions
    const [categories, setCategories] = useState([]);
    const [difficulty, setDifficulty] = useState([]);
    const [numQuestions, setNumQuestions] = useState(10);

    // Handle Category Change (checkboxes)
    const handleCategoryChange = (event) => {
        const value = event.target.value;
        setCategories(prev =>
            prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
        );
    };

    // Handle Difficulty Change (checkboxes)
    const handleDifficultyChange = (event) => {
        const value = event.target.value;
        setDifficulty(prev => 
            prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
        );
    };

    // Handle number of questions (dropdown)
    const handleNumQuestionsChange = (event) => {
        setNumQuestions(event.target.value)
    }

    // On form submission, navigate to the game page and pass data
    const handleStartGame = (event) => {
        event.preventDefault();

        // on button press, navigate to the GamePage and pass selected state
        navigate('/game', {
            state: {
                categories,
                difficulty,
                numQuestions
            }
        });
    };

    return (
    <div className={styles.pageContainer}>
        <div className={styles.appContainer}>
            <h1 className={styles.title}>Welcome to the Trivia Quiz!</h1>
            <form className={styles.form} onSubmit={handleStartGame}>
                {/* Categories */}
                <h3>Select Categories:</h3>
                    <div className={styles.checkboxGroup}>
                        {["music", "sport_and_leisure", "film_and_tv", "arts_and_literature", "history", "society_and_culture", "science", "geography", "general_knowledge"].map((cat) => (
                            <label key={cat} className={styles.checkboxLabel}>
                            <input
                                type="checkbox"
                                value={cat}
                                checked={categories.includes(cat)}
                                onChange={handleCategoryChange}
                                className={styles.checkbox}
                            />
                            {cat.replace(/_/g, " ").replace(/\band\b/g, "&").replace(/\b\w/g, (char) => char.toUpperCase())}
                            </label>
                        ))}
                    </div>
                {/* Difficulty */}
                <h3>Select Difficulty:</h3>
                    <div className={styles.difficultyContainer}>
                        <div className={styles.difficultyGroup}>
                            {["easy", "medium", "hard"].map((level) => (
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
                        </div>
                    </div>
                {/* NumQuestions */}
                <div>
                    <h3>Number of Questions:</h3>
                    <select value={numQuestions} onChange={handleNumQuestionsChange}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                    </select>
                </div>
                <button className={styles.button} type="submit">Start New Game</button>
            </form>
            <nav>
            <Link to='/game'>
                <button>To GamePage.jsx</button>
            </Link>
            </nav>
        </div>
    </div>
    );
};

export default LandingPage;
