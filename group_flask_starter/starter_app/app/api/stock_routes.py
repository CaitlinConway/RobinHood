import os
from flask import Blueprint, jsonify, session, request
import requests
import time
import datetime
from app.models import Watchlist, WatchlistContent, Stock, User, db

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
