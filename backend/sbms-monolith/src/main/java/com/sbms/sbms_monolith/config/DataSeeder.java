package com.sbms.sbms_monolith.config;

import com.sbms.sbms_monolith.model.AdPlan;
import com.sbms.sbms_monolith.repository.AdPlanRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;
import java.util.List;

@Component
public class DataSeeder {

    private final AdPlanRepository planRepository;

    public DataSeeder(AdPlanRepository planRepository) {
        this.planRepository = planRepository;
    }

    @PostConstruct
    public void seed() {
        if (planRepository.count() == 0) {
            AdPlan basic = new AdPlan();
            basic.setName("Basic Sidebar");
            basic.setPrice(2500.0);
            basic.setDurationDays(30);
            basic.setDescription("Simple sidebar placement for 30 days.");
            basic.setActive(true);
            basic.setFeatures(java.util.List.of("Home Page Placement", "30 day run"));

            AdPlan premium = new AdPlan();
            premium.setName("Premium Header");
            premium.setPrice(7500.0);
            premium.setDurationDays(30);
            premium.setDescription("Header banner with priority placement.");
            premium.setActive(true);
            premium.setFeatures(java.util.List.of("Header placement", "Priority review", "Weekly analytics"));

            AdPlan enterprise = new AdPlan();
            enterprise.setName("Enterprise Home");
            enterprise.setPrice(15000.0);
            enterprise.setDurationDays(30);
            enterprise.setDescription("Top-of-homepage takeover with analytics.");
            enterprise.setActive(true);
            enterprise.setFeatures(java.util.List.of("Homepage takeover", "Dedicated support", "Detailed analytics"));

            planRepository.saveAll(List.of(basic, premium, enterprise));
        }
    }

}
