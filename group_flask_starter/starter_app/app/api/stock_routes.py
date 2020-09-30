import os
from flask import Blueprint, jsonify, session, request
import requests
import time
import datetime
from app.models import Watchlist, WatchlistContent, Stock, db

stock_routes = Blueprint("stocks", __name__)
api_key = os.environ.get("FINHUB_API_KEY")


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
    print(res)
    return({"values": res})


@stock_routes.route("/profile/<stockId>")
def getProfile(stockId):
    print(stockId)
    r = requests.get(f'https://finnhub.io/api/v1/stock/profile2?symbol={stockId}&token={api_key}')
    res = r.json()
    print(res)
    return ({"values": res})

@stock_routes.route("/watchlist/<userId>")
def watchList(userId):
  watchListStocks = dict()
  watchlist = WatchlistContent.query.filter(WatchlistContent.watchlistId == userId).all()
  if watchlist:
    for stock in watchlist:
      stockTicker = Stock.query.filter(Stock.id == stock.stockId).first()
      watchListStocks[stock.stockId]= stockTicker.ticker
    return watchListStocks
  return "error no list"


@stock_routes.route("/watchlist", methods=["POST"])
def watchListPost():
  data = request.json
  if data:
    stock = Stock.query.filter(Stock.ticker == data["ticker"]).first()
    print(stock)
    if not stock:
      newStock = Stock(ticker=data['ticker'])
      db.session.add(newStock)
      db.session.commit()
      stock = Stock.query.filter(Stock.ticker == data["ticker"]).first()
    watchListItem = WatchlistContent(stockId=stock.id, watchlistId= data["watchlist"])
    db.session.add(watchListItem)
    db.session.commit()
    watchListStocks = dict()
    watchlist = WatchlistContent.query.filter(WatchlistContent.watchlistId == data["watchlist"]).all()
    if watchlist:
      for oneStock in watchlist:
        stockTicker = Stock.query.filter(Stock.id == oneStock.stockId).first()
        watchListStocks[oneStock.stockId]= stockTicker.ticker
    return watchListStocks
  return "error no list"
