# Design Facebook News Feed
## Gathering System Requirements
This is a large feature, with sub-features or smaller components to it. As an user:
- You can load and see the news feed
- You can interact with the news feed
  - For example, liking or posting status updates
- Updating the news feed with post at real time

That is the focus of this design. Not what goes into a post or the API. Posts are going to be treated as opaque entities that we would want to store, but without worrying about the details of storage. 

Therefore, the system requirements are:
- Loading and Updating a news feed
- Posting, and how it affects the rest of the user's news feed
- Ranking algorithm is an external service. In which relevant posts can be feed in, and the service generates the news feed for you
- Ads of the new feed are a bonus part of the design. 
- Global user base
- 1 Billion users per day. Which adds up to 5 Billion news feed loads per day
- 10 Million news status posted every day
- 500 friends per user on average
- latency would be 1s to 1m, depending on how far people are.
- Posts should be persistent (no HA)

## Coming Up With A Plan
The system would be divided into two major subsections. There is an entire flow that starts on an user posting an status update, and there is the entire flow that starts at an user loading the news feed

The design stats at the extremity of the system and work inwards. First there will be an explanation of the two API calls (CreatePost and GetFeed). Then there will be an explanation of the feed creation and storage strategy, cross-region design and how the entire system ties together in a fast and scalable manner.

With the scale that the system is managing, the APIs needs to have a heavy load-balancing implemented. 

## CreatePost() API
When calling the CreatePost() endpoint, the system would redirect the request to a Load Balancer (LB) or a cluster of LBs.

When creating a post, there isn't any caching or "server stickiness" necessary. Creating a post just means adding data to the database. This means that the LB servers could distribute the load in a Round-Robin approach.
