import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import GamePage from './components/GamePage/GamePage';
import styles from './App.module.css';

const App = () => {
  return (
    <div className={styles.appContainer}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/game" element={<GamePage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
