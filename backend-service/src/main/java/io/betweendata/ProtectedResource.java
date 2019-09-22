package io.betweendata;

import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.jboss.resteasy.annotations.cache.NoCache;
import org.keycloak.KeycloakSecurityContext;

// Quarkus always expects the class to be annoted with the path. (see https://github.com/quarkusio/quarkus/issues/1999 for details)
@Path("/")
@RolesAllowed("user")
public class ProtectedResource {  
  @Inject
  KeycloakSecurityContext securityContext;

  @GET
  @Produces(MediaType.APPLICATION_JSON)
  @Path("/secretMessage")
  @NoCache
  public SecretMessage secretMessage() {
    return new SecretMessage("This is a secret message available only to authenticated users.");
  }

  public class SecretMessage {
    private String message;

    public SecretMessage(String message) {
      this.message = message;
    }

    public String getMessage() {
      return message;
    }

    public void setMessage(String message) {
      this.message = message;
    }
  }
}
