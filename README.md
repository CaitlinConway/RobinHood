# Welcome to the Batmanhood ReadMe!

This is a full-stack web application built using React + Redux (front-end) & SQLAlchemy + Flask + PostgreSQL (back-end)

This project is [currently hosted on Heroku](https://batmanhoodapp.herokuapp.com/)!

Much like it's side-kick, Batmanhood is a stocks analysis and management website that allows consumers easy access to stocks purchases without the need for a third-party broker. No commissions, no hassles, and no actual stocks or money - Batmanhood, your comprehensive resource for pretending to be a major player in the stock market!
<br></br>

# Wireframes:

## Home Page:
<img src=https://user-images.githubusercontent.com/65473402/94383714-b2b31380-00f5-11eb-9ab6-b3c62c4e08a8.png>

## Login Page:
<img src=https://user-images.githubusercontent.com/65473402/94383687-a16a0700-00f5-11eb-805e-8143b0d0a638.png>

See more wireframes in the [wiki](https://github.com/CaitlinConway/RobinHood/wiki/Wireframes)!

<br></br>

# MVP List

## New account creation, login, logout and demo login (9/29/20, 1 day)
- Users can create a new account with the ability to sign up, sign in, and/or sign out on each page.
- There is an available 'log in as demo user' feature to explore the site functionality

## Dashboard & Portfolio (9/30/20, 2 days)
- Users can see the stocks contained in their own portfolio on their homepage once logged in.

## Asset/Stock Detail (10/2/20, 2 days)
- Each stock will show the price history over time and current price.

## Watchlist (10/3/20, 1 day)
- Users can add and delete stocks from a watchlist which will display the current prices for all stocks contained in that list.

## Asset/Stock Search (10/4/20, 1 day)
- Users can search for a stock by name or ticker.

<br></br>

# Database Schema

<img src=./group_flask_starter/client/src/images/DB_Schema.png>


<br></br>

# API Endpoints

### Users
- GET api/users
  - returns all users
- Get api/users/:userId
  - returns user based on wildcard ID
- Post api/users
  - Sign-up for an account

### Stocks
- GET api/stocks
  - returns all reviews
- POST api/stocks
  - creates a review
- PUT api/stocks/:stockId
  - edits a review based on wildcard stockID
- DELETE api/stocks/:stockId
  - deletes a review based on wildcard stockID

### Watchlist
- GET api/watchlist/:userID
  - returns a watchlist based on wildcard userId

### Trades
- GET api/trades
  - returns all trades
- GET api/trades/:tradeId
  - returns a trade based on wildcard tradeId

<br></br>
# Sample State

{

    auth: {
        id: 1,
        email: "guest@guest.com",
        balance: "86984.21",
        firstName: "Bob",
        lastName: "Smith"
        watchListId: 1
    }

    stock: {

          owned: [
            {AAPL: 5.2},
            {AMZN: 1.0}
          ],

          watchlist: {
              tickers: [
                  "AAPL",
                  "AMZN",
                  "BABA",
                  "TSLA",
                  "MSFT",
                  "FB",
                  "NFLX",
                  "DIS"
              ]
          }

          news: [
            {
               category: "business",
               datetime: 1603311271,
               headline: "Boston Dynamics' dog-like robot can recharge on its own and gains popularity in Covid era",
               id: 5481385
               image: "https://image.cnbcfm.com/...",
               summary: 'One of the world's most ...
            },
            ...
          ]
}

<br></br>

# Frontend Routes

The components will be organized as such:
 - Root
    - BrowserRouter
       - Provider
          - App
              - NavBar
              - Main
              - Footer

The following routes will render in our App between NavBar and Footer:
- /
  - Homepage
- /login
  - Login Form
- /signup
  - Signup Form
- /:stockId
  - Individual stock price history page
