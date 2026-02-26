import { ClientProxy } from '@nestjs/microservices';
import type { OrderCreatedEvent } from "@common/events";
export declare class AppService {
    private readonly ordersClient;
    constructor(ordersClient: ClientProxy);
    createOrder(body: OrderCreatedEvent): import("rxjs").Observable<any>;
}
