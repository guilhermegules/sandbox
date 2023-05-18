package med.voll.api.doctor;

import jakarta.validation.constraints.NotNull;
import med.voll.api.address.AddressData;

public record UpdateDoctorData(
        @NotNull
        Long id,
        String phone,
        String name,
        AddressData address) {
}
