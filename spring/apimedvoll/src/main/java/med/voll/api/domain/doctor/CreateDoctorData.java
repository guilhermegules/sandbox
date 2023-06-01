package med.voll.api.domain.doctor;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import med.voll.api.domain.address.AddressData;

public record CreateDoctorData(
        @NotBlank(message = "Name is required")
        String name,
        @NotBlank(message = "Email is required")
        @Email(message = "Email format is invalid")
        String email,
        @NotBlank(message = "Phone is required")
        String phone,
        @NotBlank(message = "CRM is required")
        @Pattern(regexp = "\\d{4,6}", message = "CRM pattern is invalid")
        String crm,
        @NotNull(message = "Specialty is required")
        DoctorSpeciality specialty,
        @NotNull(message = "Address data is required")
        @Valid
        AddressData address) {
}
