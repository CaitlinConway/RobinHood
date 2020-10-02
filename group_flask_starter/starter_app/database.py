from dotenv import load_dotenv
load_dotenv()

from app import app, db
from app.models import User, Watchlist, Stocklist, Trade, Stock, WatchlistContent
from passlib.hash import sha256_crypt

with app.app_context():
  db.drop_all()
  db.create_all()

  watchlist = Watchlist(name = "watchlist")
  apple = Stock(ticker = "AAPL")
  stock2 = Stock(ticker= "AMZN")
  stock3 = Stock(ticker= "BABA")
  stock4 = Stock(ticker= "TSLA")
  stock5 = Stock(ticker= "MSFT")
  stock6 = Stock(ticker= "GOOG")
  stock7 = Stock(ticker= "DIS")
  stock8 = Stock(ticker= "NFLX")
  stock9 = Stock(ticker= "BEST")
  stock10 = Stock(ticker= "NVDA")
  watchlistContent = WatchlistContent(watchlistId = 1, stockId = 1)
  guest = User(email = 'guest@guest.com', firstName = 'Bob', lastName = 'Smith', password=sha256_crypt.hash('password'), balance = 10000, watchlistId = 1)
  stocklist = Stocklist(shares = 3, stockId = 1, userId = 1)
  watchlistContent2 = WatchlistContent(watchlistId = 1, stockId = 2)
  watchlistContent3 = WatchlistContent(watchlistId = 1, stockId = 3)
  watchlistContent4 = WatchlistContent(watchlistId = 1, stockId = 4)
  watchlistContent5 = WatchlistContent(watchlistId = 1, stockId = 5)
  watchlistContent6 = WatchlistContent(watchlistId = 1, stockId = 6)
  watchlistContent7 = WatchlistContent(watchlistId = 1, stockId = 7)
  watchlistContent8 = WatchlistContent(watchlistId = 1, stockId = 8)
  watchlistContent9 = WatchlistContent(watchlistId = 1, stockId = 9)

  db.session.add(watchlist)
  db.session.add(apple)
  db.session.add(stock2)
  db.session.add(stock3)
  db.session.add(stock4)
  db.session.add(stock5)
  db.session.add(stock6)
  db.session.add(stock7)
  db.session.add(stock8)
  db.session.add(stock9)
  db.session.add(stock10)
  db.session.add(watchlistContent)
  db.session.add(guest)
  db.session.add(stocklist)
  db.session.add(watchlistContent2)
  db.session.add(watchlistContent3)
  db.session.add(watchlistContent4)
  db.session.add(watchlistContent5)
  db.session.add(watchlistContent6)
  db.session.add(watchlistContent7)
  db.session.add(watchlistContent8)
  db.session.add(watchlistContent9)


  db.session.commit()
