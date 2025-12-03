package com.sbms.sbms_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
public class SbmsBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(SbmsBackendApplication.class, args);
	}

}
