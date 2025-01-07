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