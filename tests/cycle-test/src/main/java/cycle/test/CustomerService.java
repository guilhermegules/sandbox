package cycle.test;

public class CustomerService {
    private OrderService orderService;

    public void setOrderService(OrderService orderService) {
        this.orderService = orderService;
    }

    public String getOrderDetails(Long id) {
        if (orderService != null) {
            return orderService.getCustomerName(id);
        }
        return "No order";
    }

    public String getCustomerName(Long id) {
        return "Customer-" + id;
    }
}