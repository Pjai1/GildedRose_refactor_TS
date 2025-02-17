const MAX_QUALITY = 50;
const SULFURAS_FIXED_QUALITY = 80;

const knownItems = ['Aged Brie', 'Backstage passes to a TAFKAL80ETC concert', 'Sulfuras, Hand of Ragnaros'] as const;
type KnownItems = (typeof knownItems)[number];
type AgedBrie = (typeof knownItems)[0];
type Sulfuras = (typeof knownItems)[2];

interface AgedBrieItem extends Omit<Item, 'name'> {
  name: AgedBrie;
}
const isAgedBrie = (item: Item): item is AgedBrieItem => item.name === 'Aged Brie';

interface SulfurasItem extends Omit<Item, 'name'> {
  name: Sulfuras;
}
const isSulfuras = (item: Item): item is SulfurasItem => item.name === 'Sulfuras, Hand of Ragnaros';

export class Item {
  name: KnownItems | string;
  sellIn: number;
  quality: number;

  constructor(name: Item['name'], sellIn: Item['sellIn'], quality: Item['quality']) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Item[];

  constructor(items: Item[] = []) {
    this.items = items;
  }

  updateQuality(): Item[] {
    for (let i = 0; i < this.items.length; i++) {
      const currentItem = this.items[i];

      if (isAgedBrie(currentItem)) {
        this.updateAgedBrieQuality(currentItem);
        continue;
      }

      if (isSulfuras(currentItem)) {
        this.updateSulfurasQuality(currentItem);
        continue;
      }

      if (currentItem.name !== 'Backstage passes to a TAFKAL80ETC concert') {
        if (currentItem.quality > 0) {
          currentItem.quality = currentItem.quality - 1;
        }
      } else {
        if (currentItem.quality < MAX_QUALITY) {
          currentItem.quality = currentItem.quality + 1;

          if (currentItem.sellIn < 11) {
            if (currentItem.quality < MAX_QUALITY) {
              currentItem.quality = currentItem.quality + 1;
            }
          }

          if (currentItem.sellIn < 6) {
            if (currentItem.quality < MAX_QUALITY) {
              currentItem.quality = currentItem.quality + 1;
            }
          }
        }
      }

      currentItem.sellIn = currentItem.sellIn - 1;

      if (currentItem.sellIn < 0) {
        if (currentItem.name !== 'Backstage passes to a TAFKAL80ETC concert') {
          if (currentItem.quality > 0) {
            currentItem.quality = currentItem.quality - 1;
          }
        } else {
          currentItem.quality = currentItem.quality - currentItem.quality;
        }
      }
    }

    return this.items;
  }

  private updateAgedBrieQuality(item: AgedBrieItem): void {
    if (item.quality < MAX_QUALITY) {
      item.quality += 1;
    }

    item.sellIn -= 1;

    if (item.sellIn < 0 && item.quality < MAX_QUALITY) {
      item.quality += 1;
    }
  }

  private updateSulfurasQuality(item: SulfurasItem): void {
    item.quality = SULFURAS_FIXED_QUALITY;
  }
}
