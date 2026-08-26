package cycle.test;

public class DependencyCycleExample {
    public static void main(String[] args) {
        // Create circular dependency demo
        OrderService orderService = new OrderService();
        CustomerService customerService = new CustomerService();
        PaymentService paymentService = new PaymentService();

        // Set up circular dependencies
        orderService.setCustomerService(customerService);
        customerService.setOrderService(orderService);
        paymentService.setOrderService(orderService);

        // This will demonstrate the cycle
        System.out.println("Demonstrating circular dependencies...");
        System.out.println("OrderService -> CustomerName: " + orderService.getCustomerName(1L));
        System.out.println("CustomerService -> OrderDetails: " + customerService.getOrderDetails(1L));
        System.out.println("PaymentService -> Process: " + paymentService.processPayment(1L));
    }
}