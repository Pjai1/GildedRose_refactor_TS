import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  describe('Aged Brie', () => {
    it('increases in quality the older it gets', () => {
      const gildedRose = new GildedRose([new Item('Aged Brie', 2, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(1);
    });

    it('increases in quality twice as fast after sell date', () => {
      const gildedRose = new GildedRose([new Item('Aged Brie', 0, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(2);
    });

    it('quality of an item is never more than 50', () => {
      const gildedRose = new GildedRose([new Item('Aged Brie', 2, 50)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(50);
    });

    it('quality of an item is never negative', () => {
      const gildedRose = new GildedRose([new Item('Aged Brie', 2, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(1);
    });
  });

  describe('Sulfuras, Hand of Ragnaros', () => {
    it('never has to be sold', () => {
      const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 0, 80)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(0);
    });

    it('never decreases in quality', () => {
      const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 0, 80)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(80);
    });
  });
});
