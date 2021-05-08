import React, { useState } from 'react';
import ShoppiesNavbar from './ShoppiesNavbar.js'
import { Card, Button} from 'react-bootstrap';
import ScrollMenu from 'react-horizontal-scrolling-menu';

function App() {

  const [movies, setMovies] = useState([]);
  const [nominatedMovies, setNominatedMovies] = useState([]);
  const [nominatedMovieIDs, setNominatedMovieIDs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const OMDV_API_URL = 'http://www.omdbapi.com/'
  const OMDV_API_KEY = 'b832029b'

  function nominateMovie(movie) {
    if (nominatedMovies.length === 5) {
      alert("5 movies already nominated. Please remove one to nominate this movie.");
      return;
    }
    setNominatedMovies(oldNominatedMovies => [...oldNominatedMovies, movie]);
    setNominatedMovieIDs(oldNominatedMovieIDs => [...oldNominatedMovieIDs, movie['imdbID']]);
  }

  function removeNomination(movie) {
    setNominatedMovies(movies => movies.filter(item => item !== movie));
    setNominatedMovieIDs(movieIDs => movieIDs.filter(item => item !== movie['imdbID']));
  }

  function renderNominatedMovies() {
    return (
      <ul>
        {nominatedMovies.map((nominatedMovie) => (
          <li key={nominatedMovie['imdbID']} style={{marginTop:'10px'}}>{nominatedMovie['Title'] + ' (' + nominatedMovie['Year'] + ')'}<Button variant="danger" style={{marginLeft:'20px'}} onClick={() => removeNomination(nominatedMovie)}>Remove Nomination</Button></li>
        ))}
      </ul>
    );
  }

  function renderMovies() {

    const movieCards = movies.map((movie) => (
        <Card key={movie['Title']} className='card' style={{ width: '20rem', margin:'15px', borderRadius:'15px' }}>
        <Card.Img variant="top" src={movie['Poster']} />
        <Card.Body>
          <Card.Title>{movie['Title']}</Card.Title>
          <Card.Text>
            {movie['Year']}
          </Card.Text>
          { nominatedMovieIDs.includes(movie['imdbID'])
          ? <Button variant="danger" onClick={() => removeNomination(movie)}>Remove Nomination</Button>
          : <Button variant="primary" onClick={() => nominateMovie(movie)}>Nominate</Button>
          }
        </Card.Body>
      </Card>
     ))

    return (
      <div style={{backgroundColor:'#e7e7e7'}}>
        <ScrollMenu
        data={movieCards}
        dragging={false}
        arrowLeft={<div style={{padding: '10px', cursor: 'pointer'}}> {'<'} </div>}
        arrowRight={<div style={{padding: '10px', cursor: 'pointer'}}> {'>'} </div>}
        />
      </div>
      );
  }

  function searchOMDV(term) {
    if (term === '') {
      alert("Please enter a valid movie title.");
      return;
    }
    setSearchTerm(term);
    fetch(OMDV_API_URL + '?s=' + term + '&apiKey=' + OMDV_API_KEY)
      .then(res => res.json())
      .then(
        (result) => {
          if (result['Response'] == 'False') {
            alert('Please try searching for a movie again. \nError: ' + result['Error']);
          } else {
            setMovies(result['Search'])
          }
        },
        (error) => {
          alert('Please try searching for a movie again.');
        }
      )
  }
 
  return (
    <div>
      <ShoppiesNavbar searchOMDV={searchOMDV} nominationsCompleted={nominatedMovies.length === 5}/>
      <h3 style={{marginLeft:'10px', marginTop:'10px'}}>{searchTerm !== '' ? "Showing results for: " + searchTerm : "Start your search above."}</h3>
      {renderMovies()}
      <h3 style={{marginTop:'20px', marginLeft:'10px'}}>Nominated movies:</h3>
      <div style={{ marginLeft: '5px', backgroundColor:'#e7e7e7', borderRadius:'15px', padding: '20px', width:'50%'}}>
      {nominatedMovies.length > 0
        ? renderNominatedMovies()
        : "No movies nominated."
      }
      </div>
    </div>
  );
}

export default App;
