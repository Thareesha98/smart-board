# 📘 User Stories — Smart Boarding Management System (SBMS)

This document contains the **complete, SRS-aligned User Stories** for the Smart Boarding Management System.

---

# 🟦 Epic 1 — Student Experience

## US-STU-01 — Search and Filter Boardings
As a student, I want to search and filter available boardings by gender, price, distance, and amenities so that I can quickly find rooms that match my requirements.

## US-STU-02 — View Boarding Details
As a student, I want to view full boarding profiles including photos, rules, facilities, and reviews so that I can evaluate the accommodation before booking.

## US-STU-03 — Book a Visiting Appointment
As a student, I want to request a visiting appointment so that I can inspect the boarding before registering.

## US-STU-04 — Receive Appointment Confirmation
As a student, I want owners to confirm my requested visit with a time slot so I know when to visit.

## US-STU-05 — Register for Boarding
As a student, I want to register for a boarding through the platform so that my accommodation request is officially recorded.

## US-STU-06 — Receive Payment Reminders
As a student, I want to receive reminders about payment deadlines so that I don’t miss monthly fees.

## US-STU-07 — Make Online Payments
As a student, I want to pay boarding fees and utility charges online so that transactions are fast and secure.

## US-STU-08 — View My Monthly Bills
As a student, I want to see my past and current monthly bills so that I can track payments.

## US-STU-09 — Add Reviews and Ratings
As a student, I want to submit reviews and ratings for the boarding so that other students can evaluate it.

## US-STU-10 — Report Issues
As a student, I want to report owners or boarding issues to the admin so that misuse can be prevented.

## US-STU-11 — Submit Maintenance Requests
As a student, I want to send maintenance requests to owners so that boarding issues can be fixed promptly.

## US-STU-12 — Get Notifications
As a student, I want notifications about appointments, payments, and updates so that I can stay informed.

---

# 🟩 Epic 2 — Boarding Owner Module

## US-OWN-01 — Publish Boarding Advertisement
As an owner, I want to publish new boarding ads with photos and details so that students can find my listings.

## US-OWN-02 — Manage My Ads
As an owner, I want to edit or delete my existing ads so that I can keep information updated.

## US-OWN-03 — Manage Appointments
As an owner, I want to accept or decline visit requests so that I can manage my time.

## US-OWN-04 — Propose Time Slots
As an owner, I want to offer alternative visit times so that appointments can be scheduled efficiently.

## US-OWN-05 — Add Monthly Utility Costs
As an owner, I want to add electricity and water charges so they can be included in monthly billing.

## US-OWN-06 — Boost Advertisements
As an owner, I want to pay extra to boost my ads so they are shown to more students.

## US-OWN-07 — Report Students
As an owner, I want to report students who violate terms so that admins can take action.

## US-OWN-08 — Manage Subscription Plans
As an owner, I want to subscribe to plans that allow me to publish or promote ads.

## US-OWN-09 — Receive Notifications
As an owner, I want notifications about appointments, approvals, reports, and updates.

---

# 🟧 Epic 3 — Admin Module

## US-ADM-01 — Review Student or Owner Reports
As an admin, I want to review submitted reports so that I can moderate the system.

## US-ADM-02 — Approve or Reject Ads
As an admin, I want to approve or reject new boarding ads so that only valid listings go live.

## US-ADM-03 — Manage Users
As an admin, I want to deactivate or block student/owner accounts to maintain safety.

## US-ADM-04 — Publish Third-Party Ads
As an admin, I want to upload external promotional ads from brands.

## US-ADM-05 — View Analytics Dashboard
As an admin, I want to see analytics (payments, registrations, reports) so that I can monitor system performance.

## US-ADM-06 — View Activity Logs
As an admin, I want to access logs of user activities to detect suspicious actions.

---

# 🟥 Epic 4 — Payment & Billing

## US-PAY-01 — Make a Payment
As a student, I want to pay for my boarding and utilities online securely.

## US-PAY-02 — View Payment History
As a student, I want to check my past payment records.

## US-PAY-03 — Auto-Generate Monthly Bills
As the system, I want to automatically generate monthly boarding + utility bills.

## US-PAY-04 — Handle Payment Verification
As the system, I want to verify payments securely with the payment gateway.

## US-PAY-05 — Send Payment Notifications
As the system, I want to notify users about successful or failed payments.

---

# 🟪 Epic 5 — Notification & Communication

## US-NOT-01 — Show In-App Notifications
As any user, I want to see in-app notifications.

## US-NOT-02 — Send Email Alerts
As the system, I want to send email alerts for important updates.

## US-NOT-03 — Mark Notifications as Read
As a user, I want to mark notifications as read.

---

# 🟫 Epic 6 — Authentication & Authorization

## US-AUTH-01 — User Registration
As a user, I want to register as Student or Owner.

## US-AUTH-02 — Login with JWT
As a user, I want to log in using a secure authentication system.

## US-AUTH-03 — Role-Based Access Control
As the system, I want to restrict pages based on user role.

## US-AUTH-04 — Forgot Password
As a user, I want to reset my password securely.

---

# 🟧 Epic 7 — System Infrastructure

## US-INF-01 — Store Files on AWS S3
As the system, I want to store images in S3.

## US-INF-02 — Deploy on AWS EC2
As a developer, I want the system deployed on EC2 for reliability.

## US-INF-03 — Handle High Traffic
As the system, I want to remain stable under load.

## US-INF-04 — Maintain System Logs
As the system, I want to track logs for debugging.

## US-INF-05 — API Gateway Routing
As the system, I want to route microservice requests through an API Gateway.

---

# 🟦 Epic 8 — Third-Party Integrations

## US-INT-01 — Integrate Payment Gateway
As the system, I want to process payments using Stripe/PayHere.

## US-INT-02 — Integrate Email Service
As the system, I want to send email notifications using AWS SES or SMTP.

## US-INT-03 — Integrate External Ads
As an admin, I want to upload external promotional ads.

---

# 🟣 Epic 9 — Future Enhancements (Optional)

## US-FUT-01 — Mobile App
As a student, I want a mobile app to access the system easily.

## US-FUT-02 — AI-Based Recommendations
As a student, I want personalized recommendations.

## US-FUT-03 — In-App Chat
As users, we want to chat in real time.

---
