# Design A Code-Deployment System
## Gathering System Requirements
We are building a system that involves building and deploying code to hundreds of thousands of machines spread out across 5-10 regions around the world. The system will be designed to deploy repeatedly thousands of times per day.

Building code involves grabbing snapshots of the code using commit SHA identifiers. Beyond that, the actual implementation details are assumed to be taken cared of.

The technical details are not relevant to this design (JavaScript, C++, etc..). This design involves just the repeated building of code.

Building code will take around 15 minutes, and it will result in a binary file up to 10 GB. The entire deployment process involves building and deploying the code. And we want it to take at most 30 minutes.

Each build will end up in a terminal end-state. This would be either **Success** or **Failure**. And although availability is important, with 2 or 3 nines is enough. We don't need to optimize the system to be Highly Available.

## Coming Up With A Plan
What are the major, distinguishable components of our system?

The system will be very simple. It will be divided into two subsystems:
- **The Build System**: Which builds the code into binaries
- **The Deployment System**: Which deploys binaries to the machines across the world.

Each of the subsystems will have many components inside of them.

## Build System - General Overview
