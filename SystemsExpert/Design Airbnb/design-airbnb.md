# Design Airbnb
## Gathering System Requirements
The design will focus on the core aspects of Airbnb. This involves the possibility for hosts to create property listings and for renters to search for listings and book them.

The system will support these features:
- Host Side: create and delete listings
- Renter Side: search for listings, getting an individual one and reserving it.

From the UI perspective, when a user presses the **Book Now** button, the listing should **reserve** for a period of time. During this period of time, the renters won't be able to see the listings or even search for it.

The system won't support what happens after the reservation is made. The only functionality supported in this regard will be:
- Cancelling the reservation if 15 minutes has passed and the booking process has not been completed yet
- Making the reservation permanent

When it comes to listing, the only two variables that the design will take into account will be:
- Location
- Available Range

The other variables of a listing won't be taken into account. These are characteristics such as price, amenities, parking, etc.. .

Latency is something to take into consideration when searching for listings, and when creating new listings as well.

The system will be designed to have a 50 million user base from U.S, with 1 million listings available at real-time.

## Design Plan
The design will be divided into two sections:
- The Host
- The Renter

And the renter can be divided even further into:
- Searching listings
- Getting a single listing
- Reserving a listing

## Listings Storage & Quadtree
