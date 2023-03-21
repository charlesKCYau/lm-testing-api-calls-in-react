import "./App.css";
import { StarWarsCharacter } from "./components/star_wars_character";
import { useState, useEffect } from "react";
import { Character } from "./Character";
import { STAR_WARS_URL } from "./statics/star_wars_url";
import { fetchResult } from "./util/fetch_result";

function isError(e: unknown): e is Error {
  return (e as Error).message !== undefined;
}

function App() {
	const [ character, setCharacter ] = useState<Character>({name: ""});
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState("");
  const [status, setStatus] = useState<number>();

  useEffect(() => {
    const getCharacters = async () => {
      try {
        const apiResponse = await fetch(STAR_WARS_URL);
        setIsFetching(false);
        if (apiResponse.status === 200) {
            const json = await apiResponse.json();
            setCharacter(json);
            // console.log(json);
        }
        setStatus(apiResponse.status);
      } catch (e: unknown) {
        setIsFetching(false);
        if (isError(e)) {
          setError(e.message);
        }
      }

    };
    getCharacters();
  }, [STAR_WARS_URL]);
  
  const result = fetchResult(status, error, character);

  if (isFetching)
    return (
      <div>
        <h1>Fetching...</h1>
      </div>
    )
  else if (result === "Normal")
    return (
      <div>
        <StarWarsCharacter character={character}/>
      </div>
    )
  else
    return (
      <div>
        <StarWarsCharacter character={{name: result}} />
      </div>
    )
}

export default App;
