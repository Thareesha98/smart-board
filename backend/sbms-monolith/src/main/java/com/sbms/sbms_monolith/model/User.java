package com.sbms.sbms_monolith.model;

import com.sbms.sbms_monolith.common.BaseEntity;
import com.sbms.sbms_monolith.model.enums.Gender;
import com.sbms.sbms_monolith.model.enums.UserRole;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "users")
public class User extends BaseEntity {

    @Column(nullable = false, length = 100)
    private String fullName;

    @Column(nullable = false, unique = true, length = 150)
    private String email;

    @Column(nullable = false)
    private String password;

    private String phone;

    private String profileImageUrl;  // stored in S3 later
    
    private Gender gender;
    
    private String nicNumber;
    
    private String address;


 
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserRole role;
    private boolean verifiedOwner = true;  // For admin approval later
    private int subscription_id;
    private String accNo;
    private String studentUniversity;
    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL)
    private List<Boarding> boardings;   // List of ads owner created
}
