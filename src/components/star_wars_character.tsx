import { Character } from "../Character";

interface CharacterProps{
	character: Character;
}


export const StarWarsCharacter: React.FC<CharacterProps> = ({ character}) => {
  return (
    <div className="page">
      <h1>{character.name}</h1>
    </div>
  );
};