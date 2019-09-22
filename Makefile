dev-webclient-service:
	cd webclient-service && yarn serve

dev-backend-service:
	cd backend-service && ./mvnw compile quarkus:dev

# Create a new Docker container running keycloak
run-keycloak-server:
	docker run -d --name authentication-service -e KEYCLOAK_USER=admin -e KEYCLOAK_PASSWORD=admin -p 8180:8080 quay.io/keycloak/keycloak

# Start an existing Docker container running keycloak
start-keycloak-server:
	docker start authentication-service
