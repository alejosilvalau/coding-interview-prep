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
- id: string
- name: string
- rating: int

**DriverInfo**
- id: string
- name: string
- rating: int
- ridesCount: int
- vehicleInfo: VehicleInfo

**VehicleInfo**
- licensePlate: string
- description: string

**RideStatus**
- enum (CREATED / MATCHED / STARTED / FINISHED / CANCELLED)

## Passenger API
The passenger API will consist of simple CRUD operations interacting with the Ride entity. It will also have an endpoint to stream the driver's location alongside a ride.

```
CreateRide(userId: string, pickup: Geolocation, destination: Geolocation) => Ride
```

This endpoint will be called when a passenger asks for a ride. It will create a **Ride** instance with no **DriverInfo** and with the **RideStatus** set to **CREATED**. The backend will then call another method, **FindDriver**, which uses an algorithm to find the most best driver given the location, rating and ridesCount among other parameters.

Once the driver is selected and the driver accepts the drive, the API will call the **EditRide** method and will change the status of the ride to **MATCHED** and it will fill the **DriverInfo** with the new information.

```
GetRide(userId: string) => Ride
```
The endpoint will be called every 1-10 seconds after the ride has been created. And continuous until the status has changed to **MATCHED**.

It will be also pulled during the ride every 20-90 seconds, to update the ride's estimated price and time to destination. Also checking the **RideStatus** if the ride has been cancelled by the driver, between other things.

```
EditRide(userId: string, [...params?: properties of the Ride objet that needs to be edited]) => Ride

CancelRide(userId: string) => void
```
**CancelRide** is a wrapper around **EditRide** which calls **EditRide(userId: string, rideStatus: CANCELLED)**

```
StreamDriverLocation(userId: string)
```
Used to stream the location of the driver continously through a long-lived websocket connection. The driver is identified throuhg the **Ride** entity which is searched by the **userId**.

## Driver API
