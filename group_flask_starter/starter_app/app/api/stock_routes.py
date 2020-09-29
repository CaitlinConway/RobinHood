import os
from flask import Blueprint, jsonify, session
import requests
import time
import datetime
from app.models import Watchlist, WatchlistContent, Stock

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

@stock_routes.route("watchlist/<userId>")
def watchList(userId):
    watchListStocks = dict()
    watchlist = WatchlistContent.query.filter(WatchlistContent.watchlistId == userId).all()
    if watchlist:
        for stock in watchlist:
            stockTicker = Stock.query.filter(Stock.id == stock.stockId).first()
            print(stockTicker)
            watchListStocks[stock.stockId]= stockTicker.ticker
            print(watchListStocks)
        return watchListStocks
    return "error no list"
