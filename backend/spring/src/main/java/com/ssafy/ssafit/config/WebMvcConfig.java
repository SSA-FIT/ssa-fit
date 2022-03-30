package com.ssafy.ssafit.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

//    @Value("${resources.location}")
//    private String resourcesLocation;
//
//    @Value("${resources.uri_path}")
//    private String resourcesUriPath;

    @Override

    public void addResourceHandlers(ResourceHandlerRegistry registry){
        registry.addResourceHandler("images/exercise/**")
                .addResourceLocations("file://images/exercise/");
    }

}
