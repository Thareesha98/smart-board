package com.sbms.sbms_monolith.service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
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
import com.sbms.sbms_monolith.model.enums.BillDueStatus;
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

    public void generateBillsForMonth(String month) {

        List<UtilityBill> utilities = utilityRepo.findAll()
                .stream()
                .filter(u -> u.getMonth().equals(month))
                .toList();

        for (UtilityBill utility : utilities) {

            Boarding boarding = utility.getBoarding();

            List<Registration> registrations =
                    registrationRepo.findByBoarding_IdAndStatus(
                            boarding.getId(),
                            RegistrationStatus.APPROVED
                    );

            for (Registration reg : registrations) {

                User student = reg.getStudent();

                boolean exists = billRepo
                        .findByStudent_IdAndBoarding_IdAndMonth(
                                student.getId(),
                                boarding.getId(),
                                month
                        )
                        .isPresent();

                if (exists) continue;

                BigDecimal boardingFee = boarding.getPricePerMonth();
                BigDecimal electricity = utility.getElectricityAmount();
                BigDecimal water = utility.getWaterAmount();

                BigDecimal total = boardingFee
                        .add(electricity)
                        .add(water);

                MonthlyBill bill = new MonthlyBill();
                bill.setStudent(student);
                bill.setBoarding(boarding);
                bill.setMonth(month);
                
                bill.setBoardingFee(boardingFee);
                bill.setElectricityFee(electricity);
                bill.setWaterFee(water);
                bill.setTotalAmount(total);
                
                bill.setStatus(MonthlyBillStatus.UNPAID);
                bill.setDueDate(LocalDate.parse(month + "-10"));

                billRepo.save(bill);
            }
        }
    }

    public List<MonthlyBillResponseDTO> getForStudent(Long studentId) {
        return billRepo.findByStudent_Id(studentId)
                .stream()
                .map(bill -> MonthlyBillMapper.toDTO(
                        bill,
                        getDueStatus(bill),
                        getDueInDays(bill)
                ))
                .toList();
    }

    public List<MonthlyBillResponseDTO> getForOwner(Long ownerId) {
        return billRepo.findByBoarding_Owner_Id(ownerId)
                .stream()
                .map(bill -> MonthlyBillMapper.toDTO(
                        bill,
                        getDueStatus(bill),
                        getDueInDays(bill)
                ))
                .toList();
    }
    
    
    public BillDueStatus getDueStatus(MonthlyBill bill) {

        if (bill.getStatus() == MonthlyBillStatus.PAID) {
            return BillDueStatus.PAID;
        }

        LocalDate today = LocalDate.now();

        if (today.isAfter(bill.getDueDate())) {
            return BillDueStatus.OVERDUE;
        }

        return BillDueStatus.DUE_SOON;
    }

    public int getDueInDays(MonthlyBill bill) {

        if (bill.getStatus() == MonthlyBillStatus.PAID) {
            return 0;
        }

        return (int) ChronoUnit.DAYS.between(
                LocalDate.now(),
                bill.getDueDate()
        );
    }

    
    
    
}
