import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { MdSave } from 'react-icons/md';

export const AddExercisePage = () => {

    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('lbs');
    const [date, setDate] = useState('');

    const history = useHistory();

    // body needs to be JSON, so we use stringify to make the body JSON.
    // We also need to tell the server the body is JSON, so we include
    // a header property to show content-type is json.
    const addExercise = async () => {
        const newExercise = {name, reps, weight, unit, date};
        const response = await fetch(`/exercises`, {
            method: 'POST',
            body: JSON.stringify(newExercise),
            headers: {
                'Content-Type': 'application/json',
            }
        });       
        if (response.status === 201){
            alert("Successfully added the exercise");
        } else {
            alert(`Failed to add exercise, status code = ${response.status}`);
        }
        // Take user back to home page.
        // When home page loads, it will pull all exercises from database
        history.push("/");
    };

    return (
        <div>
            <h1>Add Exercise</h1>
            <input
                type="text"
                placeholder="Enter name here"
                value={name}
                onChange={e => setName(e.target.value)} />
            <input
                type="number"
                size="10"
                value={reps}
                placeholder="Enter reps here"
                onChange={e => setReps(e.target.value)} />
            <input
                type="number"
                size="15"
                placeholder="Enter weight here"
                value={weight}
                onChange={e => setWeight(e.target.value)} />
            <select onChange={e => setUnit(e.target.value)} >
                <option value="lbs">lbs</option>
                <option value="kg">kg</option>
            </select>
            <input
                type="text"
                size="15"
                placeholder="Enter date here"
                value={date}
                onChange={e => setDate(e.target.value)} />
            < MdSave onClick={addExercise} />
        </div>
    );
}

export default AddExercisePage;