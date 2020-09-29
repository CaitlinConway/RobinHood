import os
from flask import Blueprint, jsonify
import requests
import time
import datetime

stock_routes = Blueprint("stocks", __name__)


@stock_routes.route("/<stockId>")
def stock(stockId):
    api_key = os.environ.get("FINHUB_API_KEY")
    timestamp = int(time.time())
    r = requests.get(f'https://finnhub.io/api/v1/stock/candle?symbol={stockId.upper()}&resolution=D&from=1577836800&to={timestamp}&token={api_key}')
    json = r.json()
    print({"values": [{"closing": round(a, 2),
                        "time": datetime.datetime.fromtimestamp(int(b)).strftime("%b-%d-%Y")}
                       for (a, b) in (zip(json["c"], json["t"]))]})
    return {"values": [{"closing": round(a, 2),
                        "time": datetime.datetime.fromtimestamp(int(b)).strftime("%b-%d-%Y")}
                       for (a, b) in (zip(json["c"], json["t"]))]}
