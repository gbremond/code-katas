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

const MAX_QUALITY = 50;
const MIN_QUALITY = 0;

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    return this.items.map(item => this.updateItem(item))
  }

  private updateItem(item: Item) {
    if (item.name == SULFURAS) return;

    item.sellIn = item.sellIn - 1;

    if (item.name == AGED_BRIE) {
      this.updateAgedBrie(item);
    } else if (item.name == BACKSTAGE_PASS) {
      this.updateBackstagePass(item);
    } else {
      this.updateNormalItem(item);
    }

    return item;
  }

  private updateAgedBrie(item: Item) {
    increaseQuality(item);

    if (isExpired(item)) {
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

    if (isExpired(item)) {
      item.quality = 0
    }
  }

  private updateNormalItem(item: Item) {
    decreaseQuality(item)

    if (isExpired(item)) {
      decreaseQuality(item);
    }
  }
}

function increaseQuality(item: Item) {
  if (item.quality < MAX_QUALITY) {
    item.quality = item.quality + 1
  }
}

function decreaseQuality(item: Item) {
  if (item.quality > MIN_QUALITY) {
    item.quality = item.quality - 1
  }
}

function isExpired(item: Item) {
  return item.sellIn < 0;
}
