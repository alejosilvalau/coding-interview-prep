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
