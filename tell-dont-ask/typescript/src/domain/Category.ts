class Category {
    constructor(
        private readonly name: string,
        private readonly taxPercentage: number
    ) {
    }

    public getName(): string {
        return this.name;
    }

    public getTaxPercentage(): number {
        return this.taxPercentage;
    }
}

export default Category;

