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
The functionality only consist of displaying static data about the streamer. The user needs to fetch the **GetChannelInfo** endpoint, which will return the **ChannelInfo** entity to be displayed on the UI.

The schema for **ChannelInfo** is the following:
```
name: strng,
description: string,
currentStreamTitle: string,
followerCount: int
```

There may be other fields on the schema, but these are the most relevant.

This results following signature for **GetChannelInfo**:
```
GetChannelInfo(channelId: string) => ChannelInfo
```

## Following
The Following status can be thought as a toggle. Because a user either follows an streamer or it doesn't. 

This means that the functionality can be supported with a simple toggle endpoint, in which the backend will be in charge of setting the following status on the opposite of what is currently on.

Resulting in the following signature:
```
ToggleFollow(channelId: string) => FollowState (FOLLOWING || NOT_FOLLOWING)
```

This is the endpoint which will be called when a user presses the **Follow / Unfollow** button.

## Subscribing
The Subscribing endpoint is similar to Following. But we need more information provided from the user when it's called. Specifically, we need:
- Subscription tier
- Payment information

This means that Subscribing and Unsubscribing will be separated in two different endpoints:
```
CreateSubscription(channelId: string, subscriptionInfo: SubscriptionInfo, paymentInfo: PaymentInfo) => Subscription

CancelSubscription(channelId: string) => Subscription
```

These are the endpoints called when a user presses the **Subscribe / Unsubscribe** button respectively.

## Chat
For the chat functionality, two different endpoints are needed as well as a **Message** entity.

The schema for the **Message** entity will be the following:
```
sender: string, (The username of the sender)
text: string,
timestamp: string, (Needs to be on ISO format)
isModerator: boolean
```
The **isModerator** field helps to add an indicator on the Chat's UI that the user is a moderator when it sends a message.

The following are the endpoints needed:
```
StreamChat(channelId: string) => Message

SendMessage(channelId: string, message: string, isModerator: boolean) => string | Error
```
The **Streamchat** endpoint opens a long-lived websocket connection, and will be called once per load. It continuously stream's chat messages.

The **SendMessage** endpoint will be called when a user sends a message. The backend will take care of generating the timestamp and the Message entity, returning back the text of it. 

It will return an error if the user has been banned. The UI should automatically block the user for sending messages. But in the case that the user manages to send a message even when it's blocked, the API will return an error message.

To handle Twitch emotes, these could be represented with an special string format.
- For example, the API can interpret wrapped unique emote IDs in colons with this format **":emote-id:"**.
- Therefore, a Twitch message will look like this: **"This stream is fun :pepe:"**

The UI will detect the special string format, and return the appropriate emote. The UI also avoids to display messages sent by the user that has sent the message, and avoids displaying the message received through the web socket as well. Since the messages created by the user will be displayed on the UI as soon as they get sent through the **SendMessage** endpoint.

## video
To display the video livestream, another long-lived websocket connection needs to be opened. It will be started on page load, and will stream the video.

```
StreamVideo(channelId: string, videoQuality: VideoQuality) => VideoInfo
```
Whenever this endpoint is called, the concurrent-viewer will be increased by the backend. This number gets stored for each stream on the backend on a database. 

When the websocket connection gets terminated due to closing the tab or leaving the page, the backend will decrease the relevant concurrent-viewer count in the database.

If the user pauses the video, the UI still streams the video. But it won't render it in real-time.