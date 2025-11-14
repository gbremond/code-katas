import Category from './Category';

class Product {
    private readonly unitaryTax: number
    private readonly unitaryTaxedAmount: number

    constructor(
        private name: string,
        private price: number,
        private category: Category
    ) {
        this.unitaryTax = Math.round(this.price / 100 * this.category.getTaxPercentage() * 100) / 100
        this.unitaryTaxedAmount = Math.round((this.price + this.unitaryTax) * 100) / 100;
    }

    public getUnitaryTax() {
        return this.unitaryTax
    }

    public getUnitaryTaxedAmount() {
        return this.unitaryTaxedAmount
    }

    public getName(): string {
        return this.name;
    }

    public getPrice(): number {
        return this.price;
    }
}

export default Product;

