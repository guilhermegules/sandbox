package med.voll.api.address;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Embeddable
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Address {
    private String patio;
    private String neighborhood;
    private String zip;
    private String city;
    private String state;
    private String number;
    private String additionalData;

    public Address(AddressData address) {
        this.patio = address.patio();
        this.neighborhood = address.neighborhood();
        this.zip = address.zip();
        this.city = address.city();
        this.state = address.state();
        this.number = address.number();
        this.additionalData = address.additionalData();
    }
}
