# Design Slack
## Gathering System Requirements
This design is going to include the main communication system of slack. It mainly will allow to send messages in different slack channels.

The features that are going to be supported are:
- Loading the last messages in a Slack channel when a user connects to the channel
- On app load, seeing which channels have unread messages
- On app load, seeing which channels have unread mentions for the user loading the app. The UI will show the number of mentions for each channel
- Sending and receiving messages in real time
- Cross-device synchronization. If a user is using Slack on desktop and mobile, then both devices needs to be synchronized in all the features mentioned above.

The focus is to have low latency, and high availability. Each region is estimated to have around 20 million users, with the largest organizations having as much as 50000 users within a single channel (upper-bound).

The question will make focus on latency and functionality. High availability and regional synchronization won't be covered in this design.

## Design Plan
The main design is going to be divided into two sections:
- When the user loads the Slack app.
- Real time messages in a cross-device synchronization manner.

These two points can be further divided into:
- Showing on the UI the channels that the user is part of.
- Entering a channel and seeing all the messages.
- Differentiating the channels that have unread messages.
- Showing the unread mentions and the amount of them for each channel.

## Persistent Storage & App Load
Part of the system involves retrieving data, which takes the form of channels, messages, read receipts, etc. All this data get fetched when the app loads. To implement this, the system needs a persistent storage solution implemented.

SQL tables are the best solution in this case, since the data will be structured and queried frequently.

The **schema** for every slack channel(**channels** table) will be the following:
- id: uuid (channelId)
- orgId: uuid
- name: string
- description: string

Going along with this, we will need a **channel_members** table. It will represent the pairs of channel-members who belongs to a particular channel. It will be used on app load, to update the information of the channels which the user is a members of.

The **schema** for the **channel_members** table will be the following:
- id: uuid
- orgId: uuid
- channelId: uuid
- userId: uuid

The system also needs a table to store the historical messages on slack. This table will be huge in size, and will be queried when a user fetches a channel. The endpoint will return a paginated response since it's not necessary to retrieve all the rows of the channel from a user standpoint.

This table is fetched when the user loads the channel, since it's not necessary to load all the messages for the channels that the user won't use on the session.

The **schema** for the **historical_messages** table is the following:
- id: uuid
- orgId: uuid
- channelId: uuid
- senderId: uuid
- sentAt: timestamp
- body: string
- mentions: List<uuid>

To avoid querying channels that didn't change again, while implementing the feature of showing the channels that have unread messages, more tables are needed. Specifically two extra tables:
1. **latest_channel_timestamps**
    - The table will get updated when a user sends a message on a given channel
    - Stores the timestamp of the last activity registered on a given channel
    - This is the **schema** for the table:
      - id: uuid
      - orgId: uuid
      - channelId: uuid
      - lastActive: timestamp

2. **channel_read_receipts**
    - Stores the last time when a given users has read the channel
    - Gets updated when the user opens the channel
    - This is the **schema** for the table:
      - id: uuid
      - orgId: uuid
      - channelId: uuid
      - userId: uuid
      - lastSeen: timestamp

The last table that we need is for supporting the unread user mentions functionality. This is a number that will be displayed next to the channel name, to see how many mentions of the particular user, did happen on a given channel.

This is the **schema** for the **unread_mentions** table:
- id: uuid
- orgId: uuid
- channelId: uuid
- userId: uuid
- count: timestamp

This **count** column will get incremented when a user tags another users on a specific channel. And it will be reseted to zero when a user opens a channel that has unread mentions of themself.

## Load Balancing
Load balancing is essential for all the API calls that clients do when the app load and when they do writes to the databases. For example, when sending a message or marking a channel as read

As we don't care which API call goes to which server, the system will have a round-robin load balancer.

Upon receiving the API call, the load balancers will then forward the request to a cluster of API servers that will forward the request to the database.

## Smart Sharding


## Pub/Sub System


## System Diagram
![slack-design](./design-slack.png)