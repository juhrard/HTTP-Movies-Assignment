import React, { useState } from 'react'
import { Card, TextField, Button } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const AddMovie = props => {

  const initialMovie = {
    id: Date.now(),
    title: '',
    director: '',
    metascore: '',
    stars: [],
  };

  const [movie, setMovie] = useState(initialMovie);
  const [newStar, setNewStar] = useState('');

  const handleChange = e => {
    e.persist();
    let value = e.target.value;

    if (e.target.name === 'metascore') {
      value = parseInt(value, 10);
    }

    setMovie({
      ...movie,
      [e.target.name]: value
    });
  };

  const handleStar = e => {
    e.persist();
    let value = e.target.value;

    setNewStar(value)
  }

  const addStar = e => {
    e.preventDefault();

    setMovie({
      ...movie,
      stars: [...movie.stars, newStar],
    });
    setNewStar('');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(movie)
    axios
    .post(`http://localhost:5000/api/movies/`, movie)
    .then(res => {
      props.history.push(`/`);
    })
    .catch(err => console.log(err));
  }

  return (
    <>
      <h1 style={{textAlign: 'center'}}>Add a Movie!</h1>
      <div style={{display: 'flex', flexFlow: 'row', justifyContent: 'space-evenly'}}>
        <Card>
          <form onSubmit={handleSubmit}
            style={{
              margin: '20px', 
              width: '400px',
              color: 'white',
              borderRadius: '5px',
              display: 'flex',
              flexFlow: 'column',
            }}
          >
            <TextField
              id="title-input"
              label="Title"
              type="title"
              name="title"
              value={movie.title}
              onChange={handleChange}
            />
            <TextField
              id="director-input"
              label="Director"
              type="director"
              name="director"
              value={movie.director}
              onChange={handleChange}
            />
            <TextField
              id="metascore-input"
              label="Metascore"
              type="metascore"
              name="metascore"
              value={movie.metascore}
              onChange={handleChange}
            />
            <TextField
              id="star-input"
              label="Star"
              type="star"
              name="star"
              value={newStar}
              onChange={handleStar}
            />
            <Button
              variant="contained"
              color="primary"
              style={{marginTop: '30px'}}
              onClick={addStar}
              >
              Add Star!
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              style={{marginTop: '30px'}}
              >
              Add Movie!
            </Button>
          </form>
        </Card>
        <Card style={{padding: '30px'}}>
          <h1>Current Update Value:</h1>
          <h2>Title: {movie.title}</h2>
          <h2>Director: {movie.director}</h2>
          {movie.stars.length > 0 && (
            <>
              <h1>Stars: </h1>
              <div style={{display: 'flex', flexFlow: 'column wrap', justifyContent: 'space-evenly'}}>
                {movie.stars.map(star => (
                  <h3>{star}</h3>
                ))}
              </div>
            </>
          )}
        </Card>
      </div>
    </>
  )
}

export default AddMovie;