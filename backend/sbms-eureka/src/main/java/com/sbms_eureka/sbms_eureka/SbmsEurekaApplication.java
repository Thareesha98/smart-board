package com.sbms_eureka.sbms_eureka;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@SpringBootApplication
@EnableEurekaServer
public class SbmsEurekaApplication {

	public static void main(String[] args) {
		SpringApplication.run(SbmsEurekaApplication.class, args);
	}

}
