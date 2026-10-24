package com.example.quarkus.resource;

import com.example.quarkus.model.ProductRecord;
import com.example.quarkus.service.GreetingService;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.math.BigDecimal;
import java.util.List;

@Path("/api")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class GreetingResource {

    @Inject
    GreetingService greetingService;

    @GET
    @Path("/greeting")
    @Produces(MediaType.TEXT_PLAIN)
    public String getGreeting(@QueryParam("name") @DefaultValue("Developer") String name) {
        return greetingService.buildGreeting(name);
    }

    @GET
    @Path("/products")
    public List<ProductRecord> getProducts() {
        return List.of(
                new ProductRecord("QK-01", "Quarkus Fast Server", new BigDecimal("0.00"), "Cloud-Native"),
                new ProductRecord("QK-02", "Native Image Binary", new BigDecimal("0.00"), "GraalVM")
        );
    }

    @POST
    @Path("/products")
    public Response createProduct(ProductRecord product) {
        return Response.status(Response.Status.CREATED)
                .entity(product)
                .build();
    }
}
