import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div>
        <h1>Welcome to the Trivia Quiz!</h1>
        <form onSubmit={handleStartGame}>
            {/* Categories */}
            <label>
                <input
                    type="checkbox"
                    value="music"
                    onChange={handleCategoryChange}
                />
                Music
            </label>
            <label>
                <input
                    type="checkbox"
                    value="sport_and_leisure"
                    onChange={handleCategoryChange}
                />
                Sport & Leisure
            </label>
            <label>
                <input
                    type="checkbox"
                    value="film_and_tv"
                    onChange={handleCategoryChange}
                />
                Film & TV
            </label>
            <label>
                <input
                    type="checkbox"
                    value="arts_and_literature"
                    onChange={handleCategoryChange}
                />
                Arts & Literature
            </label>
            <label>
                <input
                    type="checkbox"
                    value="history"
                    onChange={handleCategoryChange}
                />
                History
            </label>
            <label>
                <input
                    type="checkbox"
                    value="society_and_culture"
                    onChange={handleCategoryChange}
                />
                Society & Culture
            </label>
            <label>
                <input
                    type="checkbox"
                    value="science"
                    onChange={handleCategoryChange}
                />
                Science
            </label>
            <label>
                <input
                    type="checkbox"
                    value="geography"
                    onChange={handleCategoryChange}
                />
                Geography
            </label>
            <label>
                <input
                    type="checkbox"
                    value="general_knowledge"
                    onChange={handleCategoryChange}
                />
                General Knowledge
            </label>
            {/* Difficulty */}
            <div>
                <h3>Select Difficulty:</h3>
                <label>
                    <input
                        type="checkbox"
                        value="Easy"
                        onChange={handleDifficultyChange}
                    />
                    Easy
                </label>
                <label>
                    <input
                        type="checkbox"
                        value="Medium"
                        onChange={handleDifficultyChange}
                    />
                    Medium
                </label>
                <label>
                    <input
                        type="checkbox"
                        value="Hard"
                        onChange={handleDifficultyChange}
                    />
                    Hard
                </label>
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
            <button type="submit">Start New Game</button>
        </form>
        <nav>
        <Link to='/game'>
            <button>To GamePage.jsx</button>
        </Link>
        </nav>
    </div>
    );
};

export default LandingPage;
