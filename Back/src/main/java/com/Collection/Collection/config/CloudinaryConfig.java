package com.Collection.Collection.config;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import io.github.cdimascio.dotenv.Dotenv;

@Configuration
public class CloudinaryConfig {

    @Bean
    public Cloudinary cloudinary() {
        String cloudName, apiKey, apiSecret;
        
        // Essaie d'abord de charger depuis les variables d'environnement (Docker)
        cloudName = System.getenv("CLOUDINARY_CLOUD_NAME");
        apiKey = System.getenv("CLOUDINARY_API_KEY");
        apiSecret = System.getenv("CLOUDINARY_API_SECRET");
        
        // Si pas trouvé, charge depuis le fichier .env (Local)
        if (cloudName == null || apiKey == null || apiSecret == null) {
            try {
                Dotenv dotenv = Dotenv.load();
                cloudName = dotenv.get("CLOUDINARY_CLOUD_NAME");
                apiKey = dotenv.get("CLOUDINARY_API_KEY");
                apiSecret = dotenv.get("CLOUDINARY_API_SECRET");
            } catch (Exception e) {
                throw new RuntimeException("Impossible de charger la configuration Cloudinary", e);
            }
        }
        
        return new Cloudinary(ObjectUtils.asMap(
                "cloud_name", cloudName,
                "api_key", apiKey,
                "api_secret", apiSecret));
    }
}