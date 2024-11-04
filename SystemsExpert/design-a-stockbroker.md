# Design A Stockbroker
## System Requirements
This would be a platform like Robinhood, or TD Ameritrade Website.

This design would include only:
- Market orders on stocks (current price)
- The Place Trade API call and the response receive from it.
- SQL Table for customers balances
- Millions of customers
- Only on US
- Millions of trades / day
- High Availability (HA)
- The clients would be either mobile app or web app
- Callback function
  - To the Exchange's API
  - On Complete Trade Callback

This means that if a client makes a place order (buying or selling an stock) with the broker platform (website), the exchange needs to execute it as soon as possible. This is the case, regardless of the stock price.

There isn't any margin system either. So, the account balance is the source of truth for each client.

The system won't cover downloading documents, depositing funds, withrawing funds, etc. Just the core trading function of the platform.

The designs assumes that the customer has already deposited funds on the platform. And there is a SQL Table with the balance for each customer.

The platform is an intermediary between end users, and a central exchange. This means that the platform API would be exchanging information with the central exchange API.
- This API would take a callback function, in addtion to the info of the trade
- The callback would be executed when the trade completes on the exchange level. Either when the trade gets fulfilled or rejected.
- The exchange API also has HA. Meaning that it will always be executed once
- The callback is kind of a notification when the state of the trade changes

## Design Plan
We can design it on 3 or 4 steps, or categories:
1. Think what the API of the broker would look like. This means the signature of the inputs and outputs of the API Call
2. What the backend servers are going to look like. This means the servers that handles the Place Trade API Calls
3. The design for the part of the system that handles and executes trades. Which is the part of the system that communicates with the exchange

11:27 min