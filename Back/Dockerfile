# Stage 1 : Compilation
FROM eclipse-temurin:17-jdk AS build
WORKDIR /app

# Copier les fichiers Maven
COPY pom.xml .
COPY src ./src

# Compiler l'application (utiliser mvnw si vous l'avez, sinon installer Maven)
RUN apt-get update && apt-get install -y maven && \
    mvn clean package -DskipTests

# Stage 2 : Runtime
FROM eclipse-temurin:17-jre
WORKDIR /app

# Copier le JAR compilé depuis le stage de build
COPY --from=build /app/target/*.jar app.jar

# Exposer le port
EXPOSE 8080

# Lancer l'application
ENTRYPOINT ["java", "-jar", "app.jar"]