import OrderItem from './OrderItem';
import {OrderStatus} from './OrderStatus';
import RejectedOrderCannotBeApprovedException from "../useCase/exception/RejectedOrderCannotBeApprovedException";
import ApprovedOrderCannotBeRejectedException from "../useCase/exception/ApprovedOrderCannotBeRejectedException";
import ShippedOrdersCannotBeChangedException from "../useCase/exception/ShippedOrdersCannotBeChangedException";
import OrderCannotBeShippedException from "../useCase/exception/OrderCannotBeShippedException";
import OrderCannotBeShippedTwiceException from "../useCase/exception/OrderCannotBeShippedTwiceException";

class Order {
    private total: number;
    private currency: string;
    private items: OrderItem[];
    private tax: number;

    constructor(
        private id: number = 1,
        private status = OrderStatus.CREATED,
    ) {
    }


    public getTotal(): number {
        return this.total;
    }

    public setTotal(total: number): void {
        this.total = total;
    }

    public getCurrency(): string {
        return this.currency;
    }

    public setCurrency(currency: string): void {
        this.currency = currency;
    }

    public getItems(): OrderItem[] {
        return this.items;
    }

    public setItems(items: OrderItem[]): void {
        this.items = items;
    }

    public getTax(): number {
        return this.tax;
    }

    public setTax(tax: number): void {
        this.tax = tax;
    }

    public getStatus(): OrderStatus {
        return this.status;
    }

    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public hasBeenShipped(): boolean {
        return this.status === OrderStatus.SHIPPED
    }

    public isRejected(): boolean {
        return this.status === OrderStatus.REJECTED
    }

    public isApproved() {
        return this.status === OrderStatus.APPROVED
    }

    public approve() {
        if (this.hasBeenShipped()) throw new ShippedOrdersCannotBeChangedException();

        if (this.isRejected()) throw new RejectedOrderCannotBeApprovedException();

        this.status = OrderStatus.APPROVED;
    }

    public reject() {
        if (this.hasBeenShipped()) throw new ShippedOrdersCannotBeChangedException();

        if (this.isApproved()) throw new ApprovedOrderCannotBeRejectedException();

        this.status = OrderStatus.REJECTED;
    }

    public canBeShipped() {
        if (this.status === OrderStatus.CREATED || this.status === OrderStatus.REJECTED) {
            throw new OrderCannotBeShippedException();
        }

        if (this.status === OrderStatus.SHIPPED) {
            throw new OrderCannotBeShippedTwiceException();
        }
    }

    public ship() {
        this.canBeShipped()

        this.status = OrderStatus.SHIPPED;
    }
}

export default Order;

