import { Gear } from './gear';

const BaseInventory = 20;
const BaseSpeed = 1;
const BaseBling = 0;
const BaseDamage = 1;
const BaseHealth = 5;

type GearCollection = {
  clothes: Gear;
  foot: Gear;
  hand: Gear;
  neck: Gear;
  ring: Gear;
  waist: Gear;
  weapon: Gear;
  vehicle: Gear;
};

export class Character {
  gear: GearCollection;
  currentHealth: number;
  constructor(gear: GearCollection) {
    this.gear = gear;
    this.currentHealth = this.getMaxHealth();
  }

  getInventorySize(): number {
    return (
      BaseInventory +
      Object.values(this.gear)
        .map((item) => item.inventoryBonus)
        .reduce((a, b) => a + b)
    );
  }
  getMovementSpeed(): number {
    return (
      BaseSpeed +
      Object.values(this.gear)
        .map((item) => item.speedBonus)
        .reduce((a, b) => a + b)
    );
  }
  getBlingScore(): number {
    return (
      BaseBling +
      Object.values(this.gear)
        .map((item) => item.blingBonus)
        .reduce((a, b) => a + b)
    );
  }

  getDamage(): number {
    return (
      BaseDamage +
      Object.values(this.gear)
        .map((item) => item.damageBonus)
        .reduce((a, b) => a + b)
    );
  }
  getMaxHealth(): number {
    return (
      BaseHealth +
      Object.values(this.gear)
        .map((item) => item.healthBonus)
        .reduce((a, b) => a + b)
    );
  }
  getCurrentHealth(): number {
    return this.currentHealth;
  }
}
