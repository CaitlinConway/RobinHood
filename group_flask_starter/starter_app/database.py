from dotenv import load_dotenv
load_dotenv()

from app import app, db
from app.models import User, Watchlist, Stocklist, Trade, Stock, WatchlistContent

with app.app_context():
  db.drop_all()
  db.create_all()

  watchlist = Watchlist(name = "watchlist")
  apple = Stock(ticker = "AAPL", watchlistId = 1)
  watchlistContent = WatchlistContent(watchlistId = 1, stockId = 1)
  guest = User(email = 'guest@guest.com', firstName = 'firstName', lastName = 'lastName', password='password', balance = 0, watchlistId = 1)
  stocklist = Stocklist(shares = 3, stockId = 1, userId = 1)


  db.session.add(watchlist)
  db.session.add(apple)
  db.session.add(watchlistContent)
  db.session.add(guest)
  db.session.add(stocklist)


  db.session.commit()
