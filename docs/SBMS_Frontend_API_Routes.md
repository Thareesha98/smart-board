# SBMS – Frontend API Routes (Based on SRS)

This document contains **all API routes used in the React frontend** of the Smart Boarding Management System (SBMS), strictly derived from the SRS.

---

# 🔐 Authentication API Routes

| Purpose | Method | Route |
|--------|--------|--------|
| User signup | POST | /auth/signup |
| User login | POST | /auth/login |
| Refresh token | POST | /auth/refresh |
| Validate token | GET | /auth/validate |
| Get logged user details | GET | /auth/me |
| Password reset request | POST | /auth/reset/request |
| Reset password | POST | /auth/reset/confirm |

---

# 🎓 Student Module (FR1–FR7)

## Search & Filter Boardings
| Purpose | Method | Route |
|--------|--------|--------|
| Get all boardings | GET | /boardings |
| Filter boardings | GET | /boardings/filter |
| Get boarding by ID | GET | /boardings/{boardingId} |

## Appointment Booking
| Purpose | Method | Route |
|--------|--------|--------|
| Book appointment | POST | /appointments |
| Get student appointments | GET | /appointments/student/{studentId} |
| Cancel appointment | PUT | /appointments/{id}/cancel |

## Boarding Registration
| Purpose | Method | Route |
|--------|--------|--------|
| Register for boarding | POST | /registrations |
| Get student active boarding | GET | /registrations/student/{studentId} |

## Payments
| Purpose | Method | Route |
|--------|--------|--------|
| Initiate payment | POST | /payments/create |
| Get student bills | GET | /bills/student/{studentId} |
| Get bill by ID | GET | /bills/{billId} |

## Reviews
| Purpose | Method | Route |
|--------|--------|--------|
| Add review | POST | /reviews |
| Get reviews for a boarding | GET | /reviews/boarding/{boardingId} |
| Delete review | DELETE | /reviews/{reviewId} |

## Report Issues
| Purpose | Method | Route |
|--------|--------|--------|
| Submit issue report | POST | /reports |
| Get student reports | GET | /reports/student/{studentId} |

## Maintenance Requests
| Purpose | Method | Route |
|--------|--------|--------|
| Submit maintenance request | POST | /maintenance |
| Get student maintenance history | GET | /maintenance/student/{studentId} |

---

# 🏠 Owner Module (FR8–FR13)

## Publish / Manage Ads
| Purpose | Method | Route |
|--------|--------|--------|
| Create boarding ad | POST | /owner/ads |
| Get owner's ads | GET | /owner/ads/me |
| Update ad | PUT | /owner/ads/{adId} |
| Delete ad | DELETE | /owner/ads/{adId} |

## Appointment Management
| Purpose | Method | Route |
|--------|--------|--------|
| Get owner appointments | GET | /owner/appointments |
| Accept appointment | PUT | /owner/appointments/{id}/accept |
| Decline appointment | PUT | /owner/appointments/{id}/decline |
| Propose new time | PUT | /owner/appointments/{id}/propose |

## Utility Management
| Purpose | Method | Route |
|--------|--------|--------|
| Add monthly utility | POST | /utilities |
| Get utilities for boarding | GET | /utilities/boarding/{boardingId} |

## Boost Ads
| Purpose | Method | Route |
|--------|--------|--------|
| Pay for boost | POST | /ads/boost |
| Get boosted ads | GET | /ads/boosted |

## Report Students
| Purpose | Method | Route |
|--------|--------|--------|
| Report student | POST | /reports |
| View owner reports | GET | /reports/owner/{ownerId} |

## Subscription Plans
| Purpose | Method | Route |
|--------|--------|--------|
| Get subscription plans | GET | /subscriptions/plans |
| Subscribe to a plan | POST | /subscriptions |
| Get owner subscription status | GET | /subscriptions/owner/{ownerId} |

---

# 🛡️ Admin Module (FR14–FR18)

## Review Reports
| Purpose | Method | Route |
|--------|--------|--------|
| Get all reports | GET | /admin/reports |
| Resolve report | PUT | /admin/reports/{reportId}/resolve |

## Approve Ads
| Purpose | Method | Route |
|--------|--------|--------|
| Get pending ads | GET | /admin/ads/pending |
| Approve ad | PUT | /admin/ads/{adId}/approve |
| Reject ad | PUT | /admin/ads/{adId}/reject |

## User Management
| Purpose | Method | Route |
|--------|--------|--------|
| Get all users | GET | /admin/users |
| Deactivate user | PUT | /admin/users/{userId}/deactivate |

## Third-Party Advertisements
| Purpose | Method | Route |
|--------|--------|--------|
| Upload third-party ad | POST | /admin/thirdparty-ads |
| Get all third-party ads | GET | /thirdparty-ads |
| Delete third-party ad | DELETE | /admin/thirdparty-ads/{adId} |

## Analytics
| Purpose | Method | Route |
|--------|--------|--------|
| Overview metrics | GET | /admin/analytics/overview |
| Payment analytics | GET | /admin/analytics/payments |
| User growth analytics | GET | /admin/analytics/users |

---

# 📬 Notification System (FR20)
| Purpose | Method | Route |
|--------|--------|--------|
| Get notifications for user | GET | /notifications/user/{userId} |
| Get unread count | GET | /notifications/{userId}/unread-count |
| Mark notification as read | PUT | /notifications/{id}/read |

---

# 🧾 Billing & Utilities (FR19)

## Billing
| Purpose | Method | Route |
|--------|--------|--------|
| Get student bills | GET | /bills/student/{studentId} |
| Admin: get all bills | GET | /admin/bills |

---

# 🗂 File Storage (FR22)

## File Upload
| Purpose | Method | Route |
|--------|--------|--------|
| Upload file to S3 | POST | /files/upload |
| Delete file | DELETE | /files/{fileId} |

---

# 💳 Payment Gateway (FR23)

## Payment Integration
| Purpose | Method | Route |
|--------|--------|--------|
| Create payment session | POST | /payments/create |
| Verify payment callback | POST | /payments/verify |
| Get payment history | GET | /payments/history/{userId} |

---

# ✅ End of Frontend API Route List
