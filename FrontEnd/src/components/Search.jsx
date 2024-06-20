import { useState } from "react";
import "../styles/Search.scss";
import Characters from "./Characters";
import Comics from "./Comics";
import Creators from "./Creators";

export default function Search() {
  const [characterData, setCharacterData] = useState(null);
  const [comicData, setComicData] = useState(null);
  const [creatorsData, setCreatorsData] = useState(null);
  const [characterName, setCharacterName] = useState("");
  const [showCharacters, setShowCharacters] = useState(false);
  const [showComics, setShowComics] = useState(false);
  const [showCreators, setShowCreators] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (showCharacters) {
      getCharacterData();
    } else if (showComics) {
      getAllComicData();
    } else if (showCreators) {
      getAllCreatorsData();
    }
  };

  const getCharacterData = () => {
    setCharacterData(null);
    setComicData(null);
    setCreatorsData(null);
    const url = 'http://localhost:3000/characters';
    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        setCharacterData(result);
      })
      .catch(() => {
        console.log("error while getting character data");
      });
  };

  const getAllComicData = () => {
    setCharacterData(null);
    setComicData(null);
    setCreatorsData(null);
    const url = 'http://localhost:3000/comics';
    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        setComicData(result);
      })
      .catch(() => {
        console.log("error while getting comic data");
      });
  };

  const getAllCreatorsData = () => {
    setCharacterData(null);
    setComicData(null);
    setCreatorsData(null);
    const url = 'http://localhost:3000/creators';
    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        setCreatorsData(result);
      })
      .catch(() => {
        console.log("error while getting creators data");
      });
  };

  const handleChange = (event) => {
    setCharacterName(event.target.value);
  };

  const handleReset = () => {
    setCharacterName("");
    setCharacterData(null);
    setComicData(null);
    setCreatorsData(null);
    setShowCharacters(false);
    setShowComics(false);
    setShowCreators(false);
  };

  return (
    <>
      <img className="img" src="https://static.wikia.nocookie.net/logocomics/images/d/d2/1602%282003-2004%29.png" alt="logo" />
      <form className="search" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="enter character name"
          onChange={handleChange}
        />
        <div className="buttons">
          <button type="submit" onClick={() => { setShowCharacters(true); setShowComics(false); setShowCreators(false); }}>Characters</button>
          <button type="submit" onClick={() => { setShowCharacters(false); setShowComics(true); setShowCreators(false); }}>Comics</button>
          <button type="submit" onClick={() => { setShowCharacters(false); setShowComics(false); setShowCreators(true); }}>Creators</button>
          <button type="reset" className="reset" onClick={handleReset}>
            Reset
          </button>
        </div>
      </form>

      {showCharacters && characterData && characterData[0] && (
        <Characters data={characterData} onClick={getAllComicData} />
      )}

      {showComics && comicData && comicData[0] && (
        <Comics data={comicData} onClick={getAllComicData} />
      )}

      {showCreators && creatorsData && creatorsData[0] && (
        <Creators data={creatorsData} onClick={getAllCreatorsData} />
      )}
    </>
  );
}
