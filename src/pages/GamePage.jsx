import { Link } from 'react-router-dom'

const GamePage = () => {
  return (
    <div>
      <h1>Trivia Game</h1>
      {/* Add your question and answer choices here */}
      <button>Submit Answer</button>
      <nav>
        <Link to='/'>
            <button>To GamePage.jsx</button>
        </Link>
      </nav>
    </div>
  );
};

export default GamePage;