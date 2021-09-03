type Inventory = {
  [key in DrugType]?: number;
};

export enum DrugType {
  Weed = 'WEED',
  Moonshine = 'MOONSHINE',
  // TODO: sync these types with the ones in the smart contract
}
const allDrugs = Object.keys(DrugType) as (keyof typeof DrugType)[];
export const drugTypes = allDrugs.map((key) => DrugType[key]);

export class NotEnoughSpace extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class NotEnoughGoods extends Error {
  constructor(message: string) {
    super(message);
  }
}

export interface IInventoryContainer {
  capacity: number;
  capacityUsed(): number;
  capacityRemaining(): number;

  getContents(): Inventory;
  addItems(drug: DrugType, quantity: number): void;
  removeItems(drug: DrugType, quantity: number): void;
}

export class InventoryContainer implements IInventoryContainer {
  capacity: number;
  inventory: Inventory;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.inventory = {};
  }

  getContents(): Inventory {
    return this.inventory;
  }

  capacityUsed(): number {
    return Object.values(this.inventory).reduce((a, b) => a + b);
  }
  capacityRemaining(): number {
    return this.capacity - this.capacityUsed();
  }
  addItems(drug: DrugType, quantityToAdd: number): void {
    const capacityRemaining = this.capacityRemaining();
    if (quantityToAdd > capacityRemaining) {
      throw new NotEnoughSpace(
        `You don't have enough room for ${quantityToAdd} ${drug}. Only ${capacityRemaining} space left`
      );
    }
    this.inventory[drug] = (this.inventory[drug] || 0) + quantityToAdd;
  }
  removeItems(drug: DrugType, quantityToRemove: number): void {
    const currentQuantity = this.capacityRemaining();
    if (quantityToRemove > currentQuantity) {
      throw new NotEnoughGoods(`You don't have ${quantityToRemove} ${drug}. You have ${currentQuantity} right now.`);
    }
    this.inventory[drug] = (this.inventory[drug] || 0) - quantityToRemove;
  }
}
