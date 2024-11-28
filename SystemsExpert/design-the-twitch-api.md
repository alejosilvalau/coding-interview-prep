# Design The Twitch API

## Gathering Requirements

First, we need to figure out exactly what we are building. This design will involve every API endpoint called when a user is watching the live stream of a specific streamer.

Specifically, the design is going to include the following functionality:

- Showing a streamer channel info.
  - This includes the description text, follower count, etc.
- Following and Unfollowing from a streamer.
- Subscribing and Unsubscribing from a streamer.
- Displaying the live chat and sending messages.
  - Sending messages is only available if the user has not been banned.
- Seeing the live stream and being capable of pausing and unpausing it.
- Seeing the amount of concurrent viewers of the stream.
  - It will be automatically updated every 30 seconds.

## Design Plan

Fortunately in this case, the features mentioned above lay out a step-by-step plan.

All the API endpoints defined, will take the caller's **user-specific authentication token** as an authorization header by default. Which is going to be used on the backend to identify the user who is making the requests.

The endpoints will also require a **channelId** as a parameter, which is the unique username of the streamer being displayed.

## Channel Info
