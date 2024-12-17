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
On a general view, the process of building code can be called a **job**. The build system can be designed as a queue of jobs.

Each job will have a SHA, which is the commit identifier for what version of the code it should built first. Every job will also have a **name**, which is the name of the artifact created / resulting binary.

As this is **langugage agnostic** of the type of code, all coding languages are handled here.

From the server side of the system, we can have a pool of servers (workers) which are going to handle the work. Each worker will:
1. take jobs out of the queue repeatedly in a FIFO manner.
2. Build the relevant binaries
3. Write the resulting binaries to a blob storage

Blob storages are preferred in this system, because binaries are blobs of data. We can use **Google Cloud Storage** or **S3** for instance.

## Build System - Job queue
As we cannot have the queue implemented in memory, because if there is a failure on the server, the system will lose the entire state of the jobs. We are better using an SQL table.

It's super important not to lose the queued jobs and past jobs, even on a power outage or server failure.

## Build System - SQL Job queue
We can make an SQL table called **jobs** on the DB, in which every record represents a job. We can also use the record-creation timestamps as the queue's ordering index.

Our table will look like this:
- id: string (The ID of the job, auto-generated)
- created_at: timestamp
- commit_sha: string
- name: string (A pointer to the job's binary in blob storage)
- status: enum('queued', 'running', 'succeeded', 'failed')

On the actual implementation, the system will select the record for the dequeuing mechanism by looking at the oldest **created_at** timestamp with a 'queued' status. This means that **status** will also be an index as well as **created_at**.

## Build System - Concurrency
ACID Transactions makes it safe for hundred of workers to pick up jobs, without running the same one. The transaction will look like this:
```
BEGIN TRANSACTION;
SELECT * FROM jobs WHERE status = 'queued' ORDER BY created_at ASC LIMIT 1;
// If there isn't, we transaction will Rollback.

UPDATE jobs SET status = 'running' WHERE id = prev_id //from previous query.
COMMIT;
```

The workers will be running this transaction to dequeue the next job every 5 seconds.

Lets assume that we have 100 workers dealing with the same queue. Then we will have 100 / 5 = 20 reads per second. This is easy for an SQL table to handle.

## Build System - Lost Jobs
As this is a large-scale system, there are edge cases. In this system, what would happen if:
- A worker dies in the middle of building the code?
- Or there is network partition in the system?

In average, every build will take 15 minutes. Therefore there is a high chance of one of these two happening. In this case, we want to avoid skipping a job that has been marked as 'running' but has never been finished.

To solve this problem, we could add an extra column on the **jobs** table called **last_heartbeat**. This column will be updated by the worker in a heartbeat pattern while running a particular job. In other words, the worker will update the row in the table every 3-5 minutes to let the system know that they still have a job running.

We can add an separated service that polls the table every 5 minutes and checks all the 'running' jobs. If the **last_heartbeat** has been modified more than 2 heartbeats ago, to leave a margin of error, then there is something wrong with that job.

The service then will proceed to update the status of the relevant job from 'running' to 'queued'. This will bring the job back to the job's queue. Leaving them up to another worker to take it on.

The transaction that the extra service will perform looks like this:
```SQL
UPDATE jobs SET status = 'queued' WHERE status = 'running' AND last_heartbeat < NOW() - 10 minutes;
```

## Build System - Scale Estimation
