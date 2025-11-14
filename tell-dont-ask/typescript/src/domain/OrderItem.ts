import Product from './Product';

class OrderItem {
  private readonly taxedAmount: number;
  private readonly tax: number;

  constructor(
      private readonly product: Product,
      private readonly quantity: number,
  ) {
      const unitaryTax: number = Math.round(product.getPrice() / 100 * product.getCategory().getTaxPercentage() * 100) / 100;
      const unitaryTaxedAmount: number = Math.round((product.getPrice() + unitaryTax) * 100) / 100;
      const taxedAmount: number = Math.round(unitaryTaxedAmount * quantity * 100) / 100;
      const taxAmount: number = unitaryTax * quantity;

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

