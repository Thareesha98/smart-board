//package com.sbms.sbms_monolith.controller;
//
//import com.sbms.sbms_monolith.dto.boarding.*;
//import com.sbms.sbms_monolith.service.OwnerBoardingService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.access.prepost.PreAuthorize;
//import org.springframework.web.bind.annotation.*;
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/boardings/owner")
//@CrossOrigin
//public class OwnerBoardingController {
//
//    @Autowired
//    private OwnerBoardingService ownerBoardingService;
//
//    @PostMapping("/{ownerId}")
//    @PreAuthorize("hasRole('OWNER')")
//    public OwnerBoardingResponseDTO create(
//            @PathVariable Long ownerId,
//            @RequestBody BoardingCreateDTO dto
//    ) {
//        return ownerBoardingService.create(ownerId, dto);
//    }
//
//    @PutMapping("/{ownerId}/{boardingId}")
//    @PreAuthorize("hasRole('OWNER')")
//    public OwnerBoardingResponseDTO update(
//            @PathVariable Long ownerId,
//            @PathVariable Long boardingId,
//            @RequestBody BoardingUpdateDTO dto
//    ) {
//        return ownerBoardingService.update(ownerId, boardingId, dto);
//    }
//
//    @DeleteMapping("/{ownerId}/{boardingId}")
//    @PreAuthorize("hasRole('OWNER')")
//    public String delete(
//            @PathVariable Long ownerId,
//            @PathVariable Long boardingId
//    ) {
//        ownerBoardingService.delete(ownerId, boardingId);
//        return "Boarding deleted successfully.";
//    }
//
//    @GetMapping("/{ownerId}")
//    @PreAuthorize("hasRole('OWNER')")
//    public List<OwnerBoardingResponseDTO> getAll(@PathVariable Long ownerId) {
//        return ownerBoardingService.getAllByOwner(ownerId);
//    }
//
//    @PostMapping("/{ownerId}/{boardingId}/boost")
//    @PreAuthorize("hasRole('OWNER')")
//    public OwnerBoardingResponseDTO boost(
//            @PathVariable Long ownerId,
//            @PathVariable Long boardingId,
//            @RequestParam int days
//    ) {
//        return ownerBoardingService.boost(ownerId, boardingId, days);
//    }
//}





package com.sbms.sbms_monolith.controller;

import com.sbms.sbms_monolith.dto.boarding.*;
import com.sbms.sbms_monolith.service.OwnerBoardingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/boardings/owner")
@CrossOrigin
public class OwnerBoardingController {

    @Autowired
    private OwnerBoardingService ownerBoardingService;

    // ----------------------------------------------------
    // CREATE BOARDING
    // ----------------------------------------------------
    @PostMapping
    @PreAuthorize("hasRole('OWNER')")
    public OwnerBoardingResponseDTO create(
            @RequestHeader("X-User-Id") Long ownerId,
            @RequestBody BoardingCreateDTO dto
    ) {
        return ownerBoardingService.create(ownerId, dto);
    }

    // ----------------------------------------------------
    // UPDATE BOARDING
    // ----------------------------------------------------
    @PutMapping("/{boardingId}")
    @PreAuthorize("hasRole('OWNER')")
    public OwnerBoardingResponseDTO update(
            @RequestHeader("X-User-Id") Long ownerId,
            @PathVariable Long boardingId,
            @RequestBody BoardingUpdateDTO dto
    ) {
        return ownerBoardingService.update(ownerId, boardingId, dto);
    }

    // ----------------------------------------------------
    // DELETE BOARDING
    // ----------------------------------------------------
    @DeleteMapping("/{boardingId}")
    @PreAuthorize("hasRole('OWNER')")
    public String delete(
            @RequestHeader("X-User-Id") Long ownerId,
            @PathVariable Long boardingId
    ) {
        ownerBoardingService.delete(ownerId, boardingId);
        return "Boarding deleted successfully.";
    }

    // ----------------------------------------------------
    // GET ALL OWNER BOARDINGS
    // ----------------------------------------------------
    @GetMapping
    @PreAuthorize("hasRole('OWNER')")
    public List<OwnerBoardingResponseDTO> getAll(
            @RequestHeader("X-User-Id") Long ownerId
    ) {
        return ownerBoardingService.getAllByOwner(ownerId);
    }

    // ----------------------------------------------------
    // BOOST BOARDING
    // ----------------------------------------------------
    @PostMapping("/{boardingId}/boost")
    @PreAuthorize("hasRole('OWNER')")
    public OwnerBoardingResponseDTO boost(
            @RequestHeader("X-User-Id") Long ownerId,
            @PathVariable Long boardingId,
            @RequestParam int days
    ) {
        return ownerBoardingService.boost(ownerId, boardingId, days);
    }
}

