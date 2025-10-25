# Design The Reddit API
## Gathering API Requirements
This API design involves the core user flow of interacting with a subreddit. These are pieces of information given on the prompt:
- User | userId: string, ... // More stuff.
- Subreddit | subredditId: string, ... // More stuff.

This means that users can:
- Write posts on subreddits,
- Comment on posts,
- They can upvote / downvote posts and comments.

This design will have three main entities:
- Posts
- Comments
- Votes

Each followed with their respective CRUD operations.

## Coming Up With A Plan
The first major decision is whether to store votes only on Comments and Posts, and to cast new votes by calling the **EditComment** and **EditPost** methods, or to store votes as an entirely separate entitiy. Which will be a sibling of Comments and Posts entities. 

By storing them as separated entities makes it much more straightforward to edit or remove a particular user's votes (by just calling **EditVote** for example). Therefore, this design will take that approach.

Now we can design how to design Posts, Comments and Votes separately and in that order.

## Posts
Posts will have a ***postId*, the **creatorId** (the id of the person who wrote the post), the **subredditId**, a **description** and a **title**, as well as an **createdAt** timestamp which is the time in which the post has been created.

Posts also need to count their votes, comments and awards which will then be displayed on the UI. Some backend service will be calculating or updating these numbers when the Comment, Vote and Award CRUD operations are performed.

Posts will also have a **deletedAt** and **currentVote** fields. The **deletedAt** is necessary because Reddit display deleted posts with an special message. The **currentVote** field will be to display the vote of the user on a given post. This last field will be updated on the backend after fetching Posts or when casting Votes.

This is the resulting schema for Post entities:
```
postId: string,
creatorId: string,
subredditId: string,
title: string,
description: string,
createdAt: timestamp,
votesCount: int,
commentsCount: int,
awardsCount: int,
deletedAt?: timestamp,
currentVote?: enum UP / DOWN
```

The **EditPost**, **GetPost** and **DeletePost** will be very similar. All these operations will take the **userId** of the user performing the operation. The id is going to contain authentication information, which will be used for the access-control list (ACL) checks to check if the user has permission to perform the operation.

```
CreatePost(userId: string, subredditId: string, title: string, description: string) => Post

EditPost(userId: string, postId: string, title: string, description: string) => Post

GetPost(userId: string, postId: string) => Post

DeletePost(userId: string, postId: string) => Post
```

The method **ListPosts** needs to be paginated, since there are thousands of posts on an specific subreddit. This method will receive two optional parameters:
- pageSize
- pageToken

And it will return a list of post of a maximum size of **pageSize**. It will additionally return a **nextPageToken**, which will be the token to input to the next call to **ListPost** to retrieve the next page of posts.

## Comments
This entity is similar to **Posts**. They need an id, the id of the user who created it, the id of the post being written into, the content as an string, and the rest of the fields that the **Posts** entity also has.

**Comments** will also need a **parentId**, which will point to the Post or Comment that the Comment is written onto. This allows for the UI to be reconstructed, indenting replies. The UI will have the job of sorting comments on a given reply by "createdAt" or "votesCount".

This is the resulting schema for Comments:
```
commentId: string,
creatorId: string,
postId: string,
createdAt: timestamp,
content: string,
votesCount: int,
awardsCount: int,
parentId?: string,
deletedAt?: timestamp,
currentVote?: enum UP / DOWN
```

The CRUD operations for the **Comments** entity are similar to the ones used for the **Posts** entity. With the difference of **CreateComment** taking an optional parameter **parentId** pointing to the comment that is replying. 

This last parameter is optional, because the UI will assume the Comment as a top-level comment for the Post if it doesn't has a **parentId** or it's value is null.
```
CreateComment(userId: string, postId: string, content: string, parentId?: string) => Comment

EditComment(userId: string, commentId: string, content: string) => Comment

GetComment(userId: string, commentId: string) => Comment

DeleteComment(userId: string, commentId: string) => Comment

ListComments(userId: string, postId: string, pageSize?: int, pageToken?: string) => (Comment[], nextPageToken?)
```

## Votes
The entity needs to have an id, the id of the creator, the id of the target post or comment, and type. The type will be an UP / DOWN Enum. For consistency on the API design, they will also have a **createdAt** field.

This is the resulting schema for Votes:
```
voteId: string,
creatorId: string,
targetId: string,
type: enum UP / DOWN
createdAt: timestamp
```

The API doesn't need a **GetVote** or **ListVote** methods, since they are not useful feature for the end user.

On the other hand, the **CreateVote**, **EditVote** and **DeleteVote** are simple:
- **CreateVote**: Used when a user cast a vote to a Comment or Post
- **EditVote**: Used when a user has already cast a Vote, and casts the opposite Vote on the same Comment or Post.
- **DeleteVote**: Used when a user already has a Vote casted to a Post or Comment, and just removes it.

These are the resulting signatures for the API functions of the entity:
```
CreateVote(userId: string, targetId: string, type: enum UP / DOWN) => Vote

EditVote(userId: string, voteId: string, type: enum UP / DOWN) => Vote

DeleteVote(userId: string, voteId: string) => Vote
```

## Awards
These are the awards given to a Comment or Post, which are obtained after a purchase has been successfully completed. For simplicity sake on this design, there will be only one type of Award.

To manage them, the API can have defined two different endpoints for buying and giving away awards:
- **BuyAwards**: Used to make the award payment and assign them to the user account. It will take a *paymentToken* which is a string that has the necessary information to process the payment.
- **GiveAward**: Used by a user to give awards to a Post or Comment. It takes in a *targetId* as an argument, to identify the target entity.

This is the resulting signature for the endpoints:
```
BuyAwards(userId: string, paymentToken: string, quantity: int);

GiveAward(userId: string, targetId: string) => Post | Comment
```
