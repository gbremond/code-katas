import OrderItem from './OrderItem';
import {OrderStatus} from './OrderStatus';
import RejectedOrderCannotBeApprovedException from "../useCase/exception/RejectedOrderCannotBeApprovedException";
import ApprovedOrderCannotBeRejectedException from "../useCase/exception/ApprovedOrderCannotBeRejectedException";
import ShippedOrdersCannotBeChangedException from "../useCase/exception/ShippedOrdersCannotBeChangedException";
import OrderCannotBeShippedException from "../useCase/exception/OrderCannotBeShippedException";
import OrderCannotBeShippedTwiceException from "../useCase/exception/OrderCannotBeShippedTwiceException";

class Order {
    private items: OrderItem[] = [];
    private total: number = 0;
    private tax: number = 0;

    constructor(
        private id: number = 1,
        private status = OrderStatus.CREATED,
        private currency: string = 'EUR',
    ) {
    }

    public addItem(orderItem: OrderItem) {
        this.total += orderItem.getTaxedAmount();
        this.tax += orderItem.getTax()

        this.items.push(orderItem);
    }

    public getTotal(): number {
        return this.total;
    }

    public getCurrency(): string {
        return this.currency;
    }

    public getItems(): OrderItem[] {
        return this.items;
    }

    public getTax(): number {
        return this.tax;
    }

    public getStatus(): OrderStatus {
        return this.status;
    }

    public getId(): number {
        return this.id;
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

