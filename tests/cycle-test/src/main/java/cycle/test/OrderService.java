package cycle.test;

public class OrderService {
    private CustomerService customerService;

    public void setCustomerService(CustomerService customerService) {
        this.customerService = customerService;
    }

    public String getCustomerName(Long id) {
        if (customerService != null) {
            return customerService.getCustomerName(id);
        }
        return "Unknown";
    }
}