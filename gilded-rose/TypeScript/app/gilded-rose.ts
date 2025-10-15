export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const AGED_BRIE = 'Aged Brie';
const BACKSTAGE_PASS = 'Backstage passes to a TAFKAL80ETC concert';
const SULFURAS = 'Sulfuras, Hand of Ragnaros';

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (let item of this.items) {
      if (item.name == SULFURAS) continue;

      if (item.name == AGED_BRIE) {
        if (item.quality < 50) {
          item.quality = item.quality + 1
        }
      } else if (item.name == BACKSTAGE_PASS) {
        if (item.quality < 50) {
          item.quality = item.quality + 1

          if (item.sellIn < 11) {
            if (item.quality < 50) {
              item.quality = item.quality + 1
            }
          }

          if (item.sellIn < 6) {
            if (item.quality < 50) {
              item.quality = item.quality + 1
            }
          }
        }
      } else if (item.quality > 0) {
        item.quality = item.quality - 1
      }


      item.sellIn = item.sellIn - 1;


      if (item.name == AGED_BRIE) {
        if (item.quality < 50) {
          if (item.sellIn < 0) {
            item.quality = item.quality + 1
          }
        }
      } else if (item.name == BACKSTAGE_PASS) {
        if (item.sellIn < 0) {

          item.quality = item.quality - item.quality
        }
      } else {
        if (item.sellIn < 0) {

          if (item.quality > 0) {
            item.quality = item.quality - 1
          }
        }
      }
    }

    return this.items;
  }
}
