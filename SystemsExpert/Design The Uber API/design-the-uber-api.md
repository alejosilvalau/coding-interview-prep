# Design The Uber API
## Gathering API Requirements
The API Design will be based on the **core ride-hailing** service of Uber. This means:
1. Passengers booking a ride from their phone
2. They are matched with a driver
3. During the ride, they can track the driver's location
    - This happens up until the drive finishes or gets cancelled
    - They can also see the price of the ride and the estimated time to location, amongst other things.

The **core ride-hailing** service has a passenger-facing side and a driver-facing side. This design involves both.

## Coming Up With A Plan
The API will be centered around a **Ride** entity. This entity will be associated to every Uber ride and will contain information about the ride.

This includes information about the passenger and the driver.

Because an Uber ride can only have one passenger and one driver, all the **permissioning related** to ride operations are going to be handled through the passenger and driver IDs.

Operations like **GetRide** or **EditRide** will be based entirely on **userId**. Which will then return the appropiate ride tied to that passenger or driver.

## Entities
**Ride**
It has a unique Id, information about the passenger and the driver, a status, and more details about the ride. This is the resulting schema:
- rideId: string,
- passengerInfo: PassengerInfo
- driverInfo?: DriverInfo
- rideStatus: RideStatus
- start: GeoLocation

**PassengerInfo**


**DriverInfo**


**RideStatus**
- enum (CREATED / MATCHED / STARTED / FINISHED / CANCELLED)