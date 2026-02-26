import { AppService } from './app.service';
import type { OrderCreatedEvent } from "@common/events";
export declare class AppController {
    private readonly service;
    constructor(service: AppService);
    createOrder(body: OrderCreatedEvent): Promise<import("rxjs").Observable<any>>;
}
