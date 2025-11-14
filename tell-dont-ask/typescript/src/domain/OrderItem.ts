import Product from './Product';

class OrderItem {
  private readonly taxedAmount: number;
  private readonly tax: number;

  constructor(
      private readonly product: Product,
      private readonly quantity: number,
  ) {
      const taxedAmount: number = Math.round(product.getUnitaryTaxedAmount() * quantity * 100) / 100;
      const taxAmount: number = product.getUnitaryTax() * quantity;

      this.taxedAmount = taxedAmount;
      this.tax = taxAmount;
  }

  public getProduct(): Product {
    return this.product;
  }

  public getQuantity(): number {
      return this.quantity;
  }


  public getTaxedAmount(): number {
    return this.taxedAmount;
  }

  public getTax(): number {
    return this.tax;
  }
}

export default OrderItem;

