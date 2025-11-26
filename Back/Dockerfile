# Utiliser l'image Java officielle
FROM eclipse-temurin:17-jdk

# Ajouter le jar compilé
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} app.jar

# Exposer le port de l'application
EXPOSE 8080

# Lancer l'application
ENTRYPOINT ["java","-jar","/app.jar"]
