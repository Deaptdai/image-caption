package com.deapt.imagecaption;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.deapt.imagecaption.mapper")
public class ImageCaptionApplication {
    public static void main(String[] args) {
        SpringApplication.run(ImageCaptionApplication.class, args);
    }

}
