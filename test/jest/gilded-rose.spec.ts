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

  describe('Backstage passes to a TAFKAL80ETC concert', () => {
    it('increases in quality as sellIn value approaches', () => {
      const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(21);
    });

    it('increases in quality by 2 when there are 10 days or less', () => {
      const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 10, 20)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(22);
    });

    it('increases in quality by 3 when there are 5 days or less', () => {
      const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 5, 20)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(23);
    });

    it('quality drops to 0 after the concert', () => {
      const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 0, 20)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(0);
    });
  });
});
