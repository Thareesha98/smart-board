# Smart Boarding Management System (SBMS)
**Version:** 1.0  
**Date:** 11 November 2025  
**Authors:** [Thareesha]  
**Supervisor:** [K. D. C. G. Kapugama]  
**Institution:** [University of Ruhuna]  

---

## 1. Introduction

### 1.1 Purpose
The Smart Boarding Management System (SBMS) is a full-featured web application designed to bridge the gap between **students seeking boarding facilities** and **boarding owners** offering accommodations. 
It enables smooth communication, booking, billing, and management processes while providing **admins** with monitoring, analytical, and approval capabilities.

This document describes the system’s requirements, functionalities, interfaces, and constraints to guide development, testing, and maintenance.

### 1.2 Scope
The system supports three main roles:

- **Students (Boarders):** Can browse and filter boarding listings, schedule visits, register for boardings, make payments, leave reviews, send maintenance requests, and report issues.
- **Boarding Owners:** Can advertise boardings, manage appointments, add monthly utility costs, boost ads via payments, and report misbehaving students.
- **Administrators:** Can review and approve ads, manage users, moderate reports, publish third-party advertisements, and analyze data.

Additional features include:
- Automated **monthly bill generation** (boarding + utilities)
- **Subscription plans** for owners to publish and boost their ads
- Integration with **online payment systems** for billing
- **Cloud-based image storage** for advertisements

The system is built using **React (Frontend)**, **Spring Boot (Backend)**, **PostgreSQL (Database)**, and **AWS Cloud Services** for hosting and storage.

---

## 2. Overall Description

### 2.1 Product Perspective
SBMS is a **multi-user, role-based web platform** that functions as a digital ecosystem for boarding management.  
It replaces manual and offline processes (phone calls, note-keeping, cash handling) with an efficient online system that automates booking, billing, and reporting.

The architecture will follow **microservices principles** using **Spring Cloud** for scalability, service discovery, and modular development.

**External Interfaces:**
- AWS S3 – for image/file storage
- Online Payment Gateway (e.g., Stripe / PayHere)
- Email/Notification Service (for payment reminders and updates)

### 2.2 User Classes and Characteristics
| User Role | Description | Skills / Access |
|------------|-------------|----------------|
| Student | End user searching and reserving boardings | Basic computer knowledge |
| Owner | Publishes and manages boarding listings | Intermediate digital literacy |
| Admin | Monitors and maintains the platform | Advanced technical/admin knowledge |

### 2.3 Operating Environment
- Frontend: React.js  
- Backend: Spring Boot (Java 17+)  
- Database: PostgreSQL  
- Hosting: AWS EC2 + S3  
- OS: Linux (Ubuntu Server)  
- Browser: Chrome / Firefox / Edge  

### 2.4 Design and Implementation Constraints
- Must comply with university data privacy guidelines.  
- Internet connectivity required for all users.  
- Must support responsive design for mobile and desktop.  
- Payments must be secure and verified through SSL.

### 2.5 Assumptions and Dependencies
- Owners will upload valid and verified boarding details.  
- Students provide truthful identity and payment information.  
- Payment gateways and AWS services will remain available.  
- Admin will actively manage system content.

---

## 3. Functional Requirements

### 3.1 Student Module
| ID | Function | Description |
|----|-----------|-------------|
| FR1 | Search & Filter Boardings | Students can browse and filter by gender, price, location, and amenities. |
| FR2 | Appointment Booking | Students can send visit requests; owners can confirm with proposed time slots. |
| FR3 | Boarding Registration | Students can register for a selected boarding through the app. |
| FR4 | Payment Management | System sends reminders and allows online payments for boarding fees and utilities. |
| FR5 | Review System | Students can leave reviews and ratings for boarding rooms. |
| FR6 | Report Issues | Students can report owners or boardings to admins. |
| FR7 | Maintenance Requests | Students can send maintenance requests directly to owners. |

### 3.2 Boarding Owner Module
| ID | Function | Description |
|----|-----------|-------------|
| FR8 | Publish Advertisements | Owners can create and manage ads with images, descriptions, and rules. |
| FR9 | Appointment Management | Owners can accept/decline student appointments and send suitable time slots. |
| FR10 | Utility Management | Owners can add monthly water/electricity costs for each boarding. |
| FR11 | Ad Boosting | Owners can make extra payments to promote or boost their listings. |
| FR12 | Report Students | Owners can report students who violate terms. |
| FR13 | Subscription Plans | Owners can subscribe to plans to publish or promote ads. |

### 3.3 Admin Module
| ID | Function | Description |
|----|-----------|-------------|
| FR14 | Review Reports | Admins review reports submitted by students or owners. |
| FR15 | Approve Ads | Admins approve or reject boarding advertisements. |
| FR16 | Manage Users | Admins can manage and deactivate students or owners. |
| FR17 | Publish Third-Party Ads | Admins can upload promotional ads from brands (e.g., Redbull, Coca-Cola). |
| FR18 | Data Analysis | Admins can view reports and analytics dashboards (e.g., user growth, payments). |

### 3.4 System-Wide Functionalities
| ID | Function | Description |
|----|-----------|-------------|
| FR19 | Monthly Bill Generation | System automatically generates monthly bills combining boarding + utilities. |
| FR20 | Notification System | Email and in-app notifications for payments, appointments, and updates. |
| FR21 | Authentication & Authorization | Secure login and role-based access using JWT and Spring Security. |
| FR22 | File Storage | AWS S3 used for storing images and documents. |
| FR23 | Payment Integration | Secure online payments (Stripe/PayHere). |

---

## 4. Non-Functional Requirements

| Category | Requirement | Description |
|-----------|--------------|-------------|
| Performance | Response Time | System responses should be < 2 seconds for typical operations. |
| Security | Authentication | JWT-based authentication and password hashing using BCrypt. |
| Security | Data Privacy | Only authorized roles can access or modify sensitive data. |
| Usability | Accessibility | Interface must be responsive and intuitive for all user types. |
| Reliability | Uptime | System must ensure at least 99% availability on AWS. |
| Scalability | Architecture | Microservices-based design to support modular scaling. |
| Maintainability | CI/CD | GitHub Actions pipeline for automatic deployment and testing. |
| Portability | Cloud Deployment | Should run seamlessly on AWS EC2/Linux environments. |

---

## 5. System Models

### 5.1 Use Case Diagram
Actors:
- **Student**
- **Owner**
- **Admin**

Use Cases:
- Search & Filter Boardings  
- Book Appointment  
- Register Boarding  
- Make Payments  
- Add Reviews  
- Report Issues  
- Manage Ads (Owner)  
- Add Utilities  
- Approve Ads (Admin)  
- Analyze Data  
- Generate Bills  
- Send Notifications  

*(See attached `/docs/UseCaseDiagram.png`)*

### 5.2 System Architecture (High-Level)
- **Frontend (React)** → interacts with **API Gateway**  
- **API Gateway** → routes requests to microservices:
  - User Service  
  - Boarding Service  
  - Payment Service  
  - Admin Service  
- **Database:** PostgreSQL  
- **Storage:** AWS S3  
- **Authentication:** Spring Security + JWT  
- **Deployment:** AWS EC2 + Nginx Reverse Proxy  

---

## 6. Future Enhancements
- Mobile app version using React Native  
- Chat feature between students and owners  
- AI-based boarding recommendations  
- Automated fraud detection for fake listings  
- Multi-language support  

---

## 7. References
- IEEE Std 830-1998 (Software Requirements Specification Template)  
- AWS Documentation: [https://docs.aws.amazon.com](https://docs.aws.amazon.com)  
- Spring Boot Official Docs: [https://spring.io/projects/spring-boot](https://spring.io/projects/spring-boot)  
- React.js Docs: [https://react.dev](https://react.dev)

---

## 8. Approval
| Role | Name | Signature | Date |
|------|------|------------|------|
| Project Supervisor | [Name] |  |  |
| Team Leader | Thareesha |  |  |
| Developer 2 | [Name] |  |  |
| Developer 3 | [Name] |  |  |


