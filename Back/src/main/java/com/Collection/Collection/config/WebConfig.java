package com.Collection.Collection.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import java.nio.file.Path;
import java.nio.file.Paths;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        Path imgUploadDir = Paths.get("img"); // chemin relatif à la racine du projet Back
        String imgPath = imgUploadDir.toFile().getAbsolutePath();

        registry.addResourceHandler("/img/**")
                .addResourceLocations("file:" + imgPath + "/");
    }
}
