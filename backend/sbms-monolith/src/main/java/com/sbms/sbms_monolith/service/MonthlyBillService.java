package com.sbms.sbms_monolith.service;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sbms.sbms_monolith.dto.billing.MonthlyBillResponseDTO;
import com.sbms.sbms_monolith.mapper.MonthlyBillMapper;
import com.sbms.sbms_monolith.model.Boarding;
import com.sbms.sbms_monolith.model.MonthlyBill;
import com.sbms.sbms_monolith.model.Registration;
import com.sbms.sbms_monolith.model.User;
import com.sbms.sbms_monolith.model.UtilityBill;
import com.sbms.sbms_monolith.model.enums.MonthlyBillStatus;
import com.sbms.sbms_monolith.model.enums.RegistrationStatus;
import com.sbms.sbms_monolith.repository.MonthlyBillRepository;
import com.sbms.sbms_monolith.repository.RegistrationRepository;
import com.sbms.sbms_monolith.repository.UtilityBillRepository;

@Service
public class MonthlyBillService {

    @Autowired
    private MonthlyBillRepository billRepo;

    @Autowired
    private UtilityBillRepository utilityRepo;

    @Autowired
    private RegistrationRepository registrationRepo;

    // ------------------------------------------------
    // SYSTEM: GENERATE MONTHLY BILLS
    // ------------------------------------------------
    public void generateBillsForMonth(String month) {

        // 1️⃣ Get all utility bills for the month
        List<UtilityBill> utilities = utilityRepo.findAll()
                .stream()
                .filter(u -> u.getMonth().equals(month))
                .toList();

        for (UtilityBill utility : utilities) {

            Boarding boarding = utility.getBoarding();

            // 2️⃣ Get approved registrations for this boarding
            List<Registration> registrations =
                    registrationRepo.findByBoarding_IdAndStatus(
                            boarding.getId(),
                            RegistrationStatus.APPROVED
                    );

            for (Registration reg : registrations) {

                User student = reg.getStudent();

                // 3️⃣ Avoid duplicate bills
                boolean exists = billRepo
                        .findByStudent_IdAndBoarding_IdAndMonth(
                                student.getId(),
                                boarding.getId(),
                                month
                        )
                        .isPresent();

                if (exists) continue;

                // 4️⃣ Calculate costs
                BigDecimal boardingFee = boarding.getPricePerMonth();
                BigDecimal electricity = utility.getElectricityAmount();
                BigDecimal water = utility.getWaterAmount();

                BigDecimal total = boardingFee
                        .add(electricity)
                        .add(water);

                // 5️⃣ Create bill
                MonthlyBill bill = new MonthlyBill();
                bill.setStudent(student);
                bill.setBoarding(boarding);
                bill.setMonth(month);
                bill.setBoardingFee(boardingFee);
                bill.setElectricityFee(electricity);
                bill.setWaterFee(water);
                bill.setTotalAmount(total);
                bill.setStatus(MonthlyBillStatus.UNPAID);

                billRepo.save(bill);
            }
        }
    }

    // -----------------------------------------------
    // STUDENT: VIEW MY BILLS
    // -----------------------------------------------
    public List<MonthlyBillResponseDTO> getForStudent(Long studentId) {
        return billRepo.findByStudent_Id(studentId)
                .stream()
                .map(MonthlyBillMapper::toDTO)
                .toList();
    }

    // -----------------------------------------------
    // OWNER: VIEW BILLS FOR MY BOARDINGS
    // -----------------------------------------------
    public List<MonthlyBillResponseDTO> getForOwner(Long ownerId) {
        return billRepo.findByBoarding_Owner_Id(ownerId)
                .stream()
                .map(MonthlyBillMapper::toDTO)
                .toList();
    }
}
