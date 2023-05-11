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
}
