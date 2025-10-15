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

const DOUBLE_QUALITY_THRESHOLD = 10;
const TRIPLE_QUALITY_THRESHOLD = 5;

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (let item of this.items) {
      if (item.name == SULFURAS) continue;

      item.sellIn = item.sellIn - 1;

      if (item.name == AGED_BRIE) {
        this.updateAgedBrie(item);
      } else if (item.name == BACKSTAGE_PASS) {
        this.updateBackstagePass(item);
      } else {
        this.updateNormalItem(item);
      }
    }

    return this.items;
  }

  private updateAgedBrie(item: Item) {
    increaseQuality(item);

    if (item.sellIn < 0) {
      increaseQuality(item);
    }
  }

  private updateBackstagePass(item: Item) {
    increaseQuality(item);

    if (item.sellIn < DOUBLE_QUALITY_THRESHOLD) {
      increaseQuality(item);
    }

    if (item.sellIn < TRIPLE_QUALITY_THRESHOLD) {
      increaseQuality(item);
    }

    if (item.sellIn < 0) {
      item.quality = 0
    }
  }

  private updateNormalItem(item: Item) {
    decreaseQuality(item)

    if (item.sellIn < 0) {
      decreaseQuality(item);
    }
  }
}

function increaseQuality(item: Item) {
  if (item.quality < 50) {
    item.quality = item.quality + 1
  }
}

function decreaseQuality(item: Item) {
  if (item.quality > 0) {
    item.quality = item.quality - 1
  }
}
