import { Character } from './character';
import { InventoryContainer } from './merchandise';
type Location = 'Bronx' | 'Brooklyn' | 'Manhattan';

type Nonce = string;
type NumTicks = number;
type Money = number;

interface GameState {
  seed: Nonce;
  currentTime: NumTicks;
  currentLocation: Location;
  cash: Money;
  debt: Money;
  character: Character;
  inventory: InventoryContainer;
}

interface GameEvent {
  name: string;
  description: string;
  timeElapsed: number;
}

interface GameLog {
  events: GameEvent[];
}

export class Game {
  seed: Nonce;

  gameState: GameState;
  gameLog: GameLog;

  character: Character;
  inventory: InventoryContainer;

  constructor(intialGameState: GameState, character: Character, seed: Nonce) {
    this.seed = seed;

    this.gameState = intialGameState;
    this.gameLog = { events: [] };

    this.character = character;
    this.inventory = new InventoryContainer(character.getInventorySize());
  }
}
