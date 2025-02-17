import { Item, GildedRose } from '@/gilded-rose';

const buildGildedRose = (item: Item) => new GildedRose([new Item(item.name, item.sellIn, item.quality)]);

describe('Gilded Rose (updateQuality)', () => {
  const AGED_BRIE = 'Aged Brie';

  describe(AGED_BRIE, () => {
    test.each([
      { sellIn: 2, quality: 0, expectedQuality: 1, description: 'increases in quality the older it gets' },
      { sellIn: 0, quality: 0, expectedQuality: 2, description: 'increases in quality twice as fast after sell date' },
      { sellIn: 2, quality: 50, expectedQuality: 50, description: 'quality is never more than 50' },
      { sellIn: 2, quality: 0, expectedQuality: 1, description: 'quality never negative' },
    ])('$description', ({ sellIn, quality, expectedQuality }) => {
      const gildedRose = buildGildedRose({ name: AGED_BRIE, sellIn, quality });
      const items = gildedRose.updateQuality();

      expect(items[0].quality).toBe(expectedQuality);
    });
  });

  const SULFURAS = 'Sulfuras, Hand of Ragnaros';

  describe(SULFURAS, () => {
    test.each([
      { sellIn: 0, quality: 80, expectedSellIn: 0, description: 'never has to be sold' },
      { sellIn: 0, quality: 80, expectedQuality: 80, description: 'never decreases in quality' },
    ])('$description', ({ sellIn, quality, expectedSellIn, expectedQuality }) => {
      const gildedRose = buildGildedRose({ name: SULFURAS, sellIn, quality });
      const items = gildedRose.updateQuality();

      if (expectedSellIn !== undefined) {
        expect(items[0].sellIn).toBe(expectedSellIn);
      }

      if (expectedQuality !== undefined) {
        expect(items[0].quality).toBe(expectedQuality);
      }
    });
  });

  const BACKSTAGE = 'Backstage passes to a TAFKAL80ETC concert';

  describe(BACKSTAGE, () => {
    test.each([
      { sellIn: 15, quality: 20, expectedQuality: 21, description: 'increases in quality as sellIn approaches' },
      {
        sellIn: 10,
        quality: 20,
        expectedQuality: 22,
        description: 'increases in quality by 2 when there are 10 days or less',
      },
      {
        sellIn: 5,
        quality: 20,
        expectedQuality: 23,
        description: 'increases in quality by 3 when there are 5 days or less',
      },
      { sellIn: 0, quality: 20, expectedQuality: 0, description: 'quality drops to 0 after the concert' },
    ])('$description', ({ sellIn, quality, expectedQuality }) => {
      const gildedRose = buildGildedRose({ name: BACKSTAGE, sellIn, quality });
      const items = gildedRose.updateQuality();

      expect(items[0].quality).toBe(expectedQuality);
    });
  });

  const CONJURED = 'Conjured Mana Cake';

  describe(CONJURED, () => {
    test.each([
      { sellIn: 2, quality: 20, expectedQuality: 18, description: 'degrades in quality twice as fast as normal items' },
      { sellIn: 0, quality: 20, expectedQuality: 16, description: 'degrades in quality twice as fast after sell date' },
      { sellIn: 2, quality: 0, expectedQuality: 0, description: 'quality of an item is never negative' },
    ])('$description', ({ sellIn, quality, expectedQuality }) => {
      const gildedRose = buildGildedRose({ name: CONJURED, sellIn, quality });
      const items = gildedRose.updateQuality();

      expect(items[0].quality).toBe(expectedQuality);
    });
  });
});
