package cycle.test;

public class PaymentService {
    private OrderService orderService;

    public void setOrderService(OrderService orderService) {
        this.orderService = orderService;
    }

    public String processPayment(Long id) {
        if (orderService != null) {
            return "Processed: " + orderService.getCustomerName(id);
        }
        return "Payment failed";
    }
}