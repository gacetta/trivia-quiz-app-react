import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {


    return (
    <div>
        <h1>Welcome to the Trivia Quiz!</h1>
        <form>
        {/* Add your form elements for categories, difficulty, and question count here */}
        <button type="submit">Start Game</button>
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
