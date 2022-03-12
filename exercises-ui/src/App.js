import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddExercisePage from './pages/AddExercisePage';
import EditExercisePage from './pages/EditExercisePage';
import Navigation from './components/Navigation';


function App() {

  const [exerciseToEdit, setExerciseToEdit] = useState();

  return (
    <div className="App">
      <Router>
        <header className = "App-header">
          <Navigation />
          <h1 className = 'logo'>Exercise Tracker</h1>
          <p className = 'logoText'><em>Simple fitness app to create, edit, and view your exercises.</em></p>
        </header>
        <main className="App-main">
          <Route path="/" exact>
            <HomePage setExerciseToEdit={setExerciseToEdit} />
          </Route>
          <Route path="/add-exercise">  
            <AddExercisePage />
          </Route>
          <Route path="/edit-exercise">
            <EditExercisePage exerciseToEdit={exerciseToEdit} />
          </Route>
          </main>
          <footer className = "App-footer">
            &copy; 2022 Brent Goldman
          </footer>
      </Router>
    </div>
  );
}

export default App;