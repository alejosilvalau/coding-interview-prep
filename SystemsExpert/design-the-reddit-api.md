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
Posts will have a ***postId*, the **creatorId** (the id of the person who wrote the post), the **subredditId**, a **description** and a **title**, as well as an **createdAt** timestap which is the time in which the post has been created.
