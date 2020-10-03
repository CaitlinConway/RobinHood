import os
from flask import Blueprint, jsonify, session, request
import requests
import time
import datetime
from app.models import Watchlist, WatchlistContent, Stock, User, Trade, db, Stocklist


stock_routes = Blueprint("stocks", __name__)
api_key = os.environ.get("FINHUB_API_KEY")
api_key_2 = os.environ.get("FINHUB_API_KEY_2")


@stock_routes.route("/<stockId>")
def stock(stockId):
    timestamp = int(time.time())
    r = requests.get(f'https://finnhub.io/api/v1/stock/candle?symbol={stockId.upper()}&resolution=D&from=1577836800&to={timestamp}&token={api_key}')
    json = r.json()
    return {"values": [{"closing": round(a, 2),
                        "time": datetime.datetime.fromtimestamp(int(b)).strftime("%b-%d-%Y")}
                       for (a, b) in (zip(json["c"], json["t"]))]}


@stock_routes.route("/current/<stockId>")
def getCurrent(stockId):
    r = requests.get(f'https://finnhub.io/api/v1/quote?symbol={stockId.upper()}&token={api_key}')
    res = r.json()
    return({"values": res})


@stock_routes.route("/profile/<stockId>")
def getProfile(stockId):
    print(stockId)
    r = requests.get(f'https://finnhub.io/api/v1/stock/profile2?symbol={stockId}&token={api_key}')
    res = r.json()
    return ({"values": res})

@stock_routes.route("/watchlist/<userId>")
def watchList(userId):
  watchListStocks = []
  watchlist = WatchlistContent.query.filter(WatchlistContent.watchlistId == userId).all()
  if watchlist:
    for stock in watchlist:
      stockTicker = Stock.query.filter(Stock.id == stock.stockId).first()
      watchListStocks.append(stockTicker.ticker)
    return {"tickers": watchListStocks}
  return "error no list"


@stock_routes.route("/watchlist", methods=["POST"])
def watchListAdd():
  data = request.json
  print(data);
  if data:
    watchList = WatchlistContent.query.filter(WatchlistContent.watchlistId == data["watchlistId"]).all()
    print(len(watchList))
    if len(watchList) >= 10:
      return {"error": "You can't have more than 10 stocks in your watchlist"}
    stock = Stock.query.filter(Stock.ticker == data["ticker"]).first()
    if not stock:
      newStock = Stock(ticker=data['ticker'])
      db.session.add(newStock)
      db.session.commit()
      stock = Stock.query.filter(Stock.ticker == data["ticker"]).first()
    watchListItem = WatchlistContent(stockId=stock.id, watchlistId=data["watchlistId"])
    db.session.add(watchListItem)
    db.session.commit()
    watchListStocks = []
    watchlist = WatchlistContent.query.filter(WatchlistContent.watchlistId == data["watchlistId"]).all()
    if watchlist:
      for oneStock in watchlist:
        stockTicker = Stock.query.filter(Stock.id == oneStock.stockId).first()
        watchListStocks.append(stockTicker.ticker)
    return {"tickers": watchListStocks}
  return "error no list"


@stock_routes.route("/watchlist/<watchlistId>/<ticker>", methods=["DELETE"])
def watchListDelete(watchlistId, ticker):
    print(ticker)
    stockId = Stock.query.filter(Stock.ticker == ticker).first().id
    print(stockId)
    watchListStock = WatchlistContent.query.filter(WatchlistContent.stockId == stockId).filter(WatchlistContent.watchlistId == watchlistId).first()
    print(watchListStock)
    if not watchListStock:
        return "error no stock"
    db.session.delete(watchListStock)
    db.session.commit()
    return {"ticker": ticker}


@stock_routes.route("/news")
def getNews():
    r = requests.get(f'https://finnhub.io/api/v1/news?category=general&token={api_key_2}')
    res = r.json()
    return({"values": res})



@stock_routes.route('/stocklist/<userId>')
def stockList(userId):
  stockListStocks = []
  stockList = Stocklist.query.filter(Stocklist.userId == userId).all()
  print(stockList)
  if stockList:
    for stock in stockList:
      stockTicker = Stock.query.filter(Stock.id == stock.stockId).first()
      stockListStocks.append(stockTicker.ticker)
    return {"tickers": stockListStocks}
  return "error no list"

@stock_routes.route("/trades/<userId>", methods=["POST"])
def makeTrade(userId):
    data = request.json
    timestamp = datetime.datetime.utcnow()
    print(data, userId)
    newTrade = Trade(
      ticker=data["ticker"],
      price=data["price"],
      shares=round(int(data["shares"]), 2),
      buy=data["buy"],
      buyDate=timestamp,
      userId=userId
    )
    currentStock = Stock.query.filter(Stock.ticker == data["ticker"]).first()
    if not currentStock:
        newStock = Stock(ticker=data['ticker'])
        db.session.add(newStock)
        db.session.commit()
        currentStock = Stock.query.filter(Stock.ticker == data["ticker"]).first()
    stockId = currentStock.id
    currentlyOwned = Stocklist.query.filter(Stocklist.stockId == stockId).filter(Stocklist.userId == userId).first()
    currentShares = 0 if not currentlyOwned else float(currentlyOwned.shares)
    newShares = float(data["shares"]) * (1 if data["buy"] else -1)
    updatedShares = round((currentShares + newShares), 2)
    currentUser = User.query.filter(User.id == userId).first()
    currentBalance = float(currentUser.balance)
    cost = round((float(data["shares"]) * float(data["price"])) * (1 if data["buy"] else -1), 2)
    updatedBalance = round((currentBalance - cost), 2)
    print(currentBalance, updatedBalance)
    print(currentShares, updatedShares)
    if updatedShares < 0:
        return {"error": "You can't have negative shares"}
    if updatedBalance < 0:
        return {"error": "You can't have a negative balance"}
    if currentlyOwned:
        currentlyOwned.shares = updatedShares
        print(currentlyOwned.shares)
    else:
        currentlyOwned = Stocklist(
          stockId=stockId,
          userId=userId,
          shares=updatedShares
        )
        print(currentlyOwned.shares)
    currentUser.balance = updatedBalance
    print(currentUser.balance)

    db.session.add(newTrade)
    db.session.add(currentlyOwned)
    db.session.add(currentUser)
    db.session.commit()
    all_stocks = Stocklist.query.filter(Stocklist.userId == userId).all()
    print(all_stocks)

    # return in format {ticker: shares}
    return {"stocks": list(
            {Stock.query.filter(Stock.id == stock.stockId).first().ticker: str(stock.shares)}
            for stock in all_stocks)
           }


@stock_routes.route("/owned/<userId>")
def getStocks(userId):
    ownedStocks = Stocklist.query.filter(Stocklist.userId == userId).all()
    # return in format {ticker: shares}
    return {"stocks": list(
            {Stock.query.filter(Stock.id == stock.stockId).first().ticker: str(stock.shares)}
            for stock in ownedStocks)
           }
