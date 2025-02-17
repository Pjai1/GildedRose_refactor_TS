const MAX_QUALITY = 50;
const SULFURAS_FIXED_QUALITY = 80;

const KNOWN_ITEMS = [
  'Aged Brie',
  'Backstage passes to a TAFKAL80ETC concert',
  'Sulfuras, Hand of Ragnaros',
  'Conjured Mana Cake',
] as const;

type KnownItems = (typeof KNOWN_ITEMS)[number];
type ItemName = KnownItems | string;
type AgedBrie = (typeof KNOWN_ITEMS)[0];
type BackstagePasses = (typeof KNOWN_ITEMS)[1];
type Sulfuras = (typeof KNOWN_ITEMS)[2];
type Conjured = (typeof KNOWN_ITEMS)[3];

export class Item {
  name: ItemName;
  sellIn: number;
  quality: number;

  constructor(name: ItemName, sellIn: number, quality: number) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}
interface AgedBrieItem extends Omit<Item, 'name'> {
  name: AgedBrie;
}

interface BackstagePassesItem extends Omit<Item, 'name'> {
  name: BackstagePasses;
}

interface SulfurasItem extends Omit<Item, 'name'> {
  name: Sulfuras;
}

interface ConjuredItem extends Omit<Item, 'name'> {
  name: Conjured;
}

interface UpdateStrategy {
  update(item: Item): void;
}

class AgedBrieStrategy implements UpdateStrategy {
  update(item: AgedBrieItem): void {
    if (item.quality < MAX_QUALITY) {
      item.quality += 1;
    }

    item.sellIn -= 1;

    if (item.sellIn < 0 && item.quality < MAX_QUALITY) {
      item.quality += 1;
    }
  }
}
class SulfurasStrategy implements UpdateStrategy {
  update(item: SulfurasItem): void {
    item.quality = SULFURAS_FIXED_QUALITY;
  }
}

class BackstagePassesStrategy implements UpdateStrategy {
  update(item: BackstagePassesItem): void {
    if (item.quality < MAX_QUALITY) {
      item.quality += 1;

      if (item.sellIn <= 10 && item.quality < MAX_QUALITY) {
        item.quality += 1;
      }

      if (item.sellIn <= 5 && item.quality < MAX_QUALITY) {
        item.quality += 1;
      }
    }

    item.sellIn -= 1;

    if (item.sellIn < 0) {
      item.quality = 0;
    }
  }
}

class ConjuredStrategy implements UpdateStrategy {
  update(item: ConjuredItem): void {
    if (item.quality > 0) {
      item.quality -= 2;

      if (item.quality < 0) {
        item.quality = 0;
      }
    }

    item.sellIn -= 1;

    if (item.sellIn < 0 && item.quality > 0) {
      item.quality -= 2;

      if (item.quality < 0) {
        item.quality = 0;
      }
    }
  }
}

class DefaultStrategy implements UpdateStrategy {
  update(item: Item): void {
    if (item.quality > 0) {
      item.quality -= 1;
    }

    item.sellIn -= 1;

    if (item.sellIn < 0 && item.quality > 0) {
      item.quality -= 1;
    }
  }
}
export class GildedRose {
  private readonly strategies: Map<string, UpdateStrategy>;
  private readonly items: Item[];

  constructor(items: Item[] = []) {
    this.items = items;
    this.strategies = new Map<string, UpdateStrategy>([
      ['Aged Brie', new AgedBrieStrategy()],
      ['Backstage passes to a TAFKAL80ETC concert', new BackstagePassesStrategy()],
      ['Sulfuras, Hand of Ragnaros', new SulfurasStrategy()],
      ['Conjured Mana Cake', new ConjuredStrategy()],
    ]);
  }

  updateQuality(): Item[] {
    for (let item of this.items) {
      const strategy = this.getStrategy(item);

      strategy.update(item);
    }

    return this.items;
  }

  private getStrategy(item: Item): UpdateStrategy {
    return this.strategies.get(item.name) || new DefaultStrategy();
  }
}
