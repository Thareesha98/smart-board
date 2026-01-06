package com.sbms.sbms_monolith;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@EnableAsync
@SpringBootApplication
public class SbmsMonolithApplication {

	public static void main(String[] args) {
		SpringApplication.run(SbmsMonolithApplication.class, args);
	}

}
