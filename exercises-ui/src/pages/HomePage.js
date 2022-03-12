import React from 'react';
import { Link } from 'react-router-dom';
import ExerciseList from '../components/ExerciseList';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function HomePage({ setExerciseToEdit }) {
    
    const [exercises, setExercises] = useState([]);
    const history = useHistory();

    // This uses a fetch to the REST API with the DELETE method to delete a exercise
    // If status returned is 204 (successful), then we can update the state of the
    // exercises so it doesn't include the deleted exercise.  We use the filter() function
    // to do this.  Filter creates a new array will all elements that pass the test implemented
    // by the provided function.
    // Finally, to actually use onDelete() we need to pass the function to the children.
    // We will include the function in the <ExerciseList> component call.  We also need to
    // update each of the components to include the function.
    const onDeleteExercise = async _id => {
        // console.log(_id);
        const response = await fetch(`/exercises/${_id}`, {method: 'DELETE'});
        // console.log(response.status);
        
        if (response.status === 204){
            // console.log('made it to filter function');
            const newExercises = exercises.filter(m => m._id !== _id);
            setExercises(newExercises);
        } else {
            console.error(`Failed to delete exercise with _id = ${_id}, status code = ${response.status}`);
        }
        
    };


    const onEdit = exercise => {
        setExerciseToEdit(exercise);
        history.push("/edit-exercise");
    };


    // This will fetch all exercises from the REST API
    // Need async because we have await / promise
    const loadExercises = async () => {
        // fetch returns a promise
        const response = await fetch('/exercises');
        // response.json returns a promise
        const data = await response.json()
        console.log(data);
        // update exercises and re-render webpage
        setExercises(data);
    }

    // Call loadExercises, only when home page is initialized
    // This is done by using the '[]' optional parameters.
    // Note, we didn't embed loadExercises function in useEffect
    // because useEffect doesn't support await.
    useEffect( () => {
        loadExercises();
    }, []);

    return (
        <>
            <h2>List of Exercises</h2>
            <div className = "App-table">
                <ExerciseList exercises={exercises} onDelete={onDeleteExercise} onEdit = {onEdit}></ExerciseList>
            </div>
            <div className = "nav">
                <Link to="/add-exercise">Add an exercise</Link>
            </div>
            
        </>
    );
}

export default HomePage;