export interface Pokemon {
  id: string;
  name: string;
  attack: number;
  defense: number;
  hp: number;
  speed: number;
  type: string;
  imageUrl: string;
}

export interface PokemonCardProps extends Pokemon {
  title: string;
  img: string;
  showStats: boolean;
  isAttackerSelected?: boolean
  isDefenderSelected?: boolean
  onClick?: () => void;
}

export interface BattleBody {
  attackerId: string;
  defenderId: string;
}