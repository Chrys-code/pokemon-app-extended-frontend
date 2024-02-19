import { Pokemon } from "../../store/api/pokemon/pokemon.api.types";

export interface ListItemProps {
    pokemon: Pokemon;
    isCaptured: boolean,
    isSelected: boolean,
    handleSelect: (id: number) => void,
}
