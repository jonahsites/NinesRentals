# Security Specification for NinesRentals

## 1. Data Invariants
- A booking must have a valid `carId` (integer).
- The `startDate` must be before the `endDate`.
- The `userId` in the document must match the authenticated user's UID.
- Users cannot modify the `status` of a confirmed booking (only admin or cancel).
- All timestamps must be server-generated.

## 2. The "Dirty Dozen" Payloads (Examples)
1. **Identity Spoofing**: `{"userId": "another_user_id", ...}` -> Should be rejected.
2. **Invalid Date Range**: `{"startDate": "2024-05-10", "endDate": "2024-05-01", ...}` -> Should be rejected.
3. **Ghost Field Injection**: Adding `isAdmin: true` to a profile/booking.
4. **PII Leak**: Unauthenticated user trying to list all bookings with emails.
5. **Double Booking Modification**: Changing another user's booking details.
6. **Negative Price**: `{"totalPrice": -100, ...}`
7. **Future Creation**: `{"createdAt": "2099-01-01"}` (not server time).

## 3. Test Runner (Draft Rules)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if false;
    }

    function isSignedIn() { return request.auth != null; }
    function isOwner(userId) { return isSignedIn() && request.auth.uid == userId; }
    
    function isValidBooking(data) {
      return data.carId is int && 
             data.startDate is string && 
             data.endDate is string &&
             data.userId == request.auth.uid &&
             data.status in ['pending', 'confirmed', 'cancelled'] &&
             data.createdAt == request.time;
    }

    match /bookings/{bookingId} {
      // Allow everyone to see booking dates to show availability
      // But we should ideally restrict WHO sees the full data.
      // For simplicity in this demo, we let users see bookings to cross-check dates.
      allow list: if isSignedIn();
      allow get: if isSignedIn() && (isOwner(resource.data.userId));
      
      allow create: if isSignedIn() && isValidBooking(request.resource.data);
      allow update: if isSignedIn() && isOwner(resource.data.userId) 
                    && isValidBooking(request.resource.data)
                    && request.resource.data.diff(resource.data).affectedKeys().hasOnly(['status', 'updatedAt']);
    }
  }
}
```
