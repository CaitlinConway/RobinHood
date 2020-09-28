from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Watchlist(db.Model):
  __tablename__ = "watchlists"

  id = db.Column(db.Integer, primary_key = True)
  name = db.Column(db.String(50))


class Stock(db.Model):
  __tablename__ = "stocks"

  id = db.Column(db.Integer, primary_key = True)
  ticker = db.Column(db.String(10), nullable = False)

class WatchlistContent(db.Model):
  __tablename__ = "watchlistContent"
  id = db.Column(db.Integer, primary_key = True)
  watchlistId = db.Column(db.Integer, db.ForeignKey("watchlists.id"))
  watchlist = db.relationship("Watchlist")
  stockId = db.Column(db.Integer, db.ForeignKey("stocks.id"))
  stock = db.relationship("Stock")




class User(db.Model):
  __tablename__ = 'users'

  id = db.Column(db.Integer, primary_key = True)
  email = db.Column(db.String(255), nullable = False, unique = True)
  firstName = db.Column(db.String(255), nullable = False)
  lastName = db.Column(db.String(255), nullable = False)
  password = db.Column(db.String(100), nullable=False)
  balance = db.Column(db.Numeric, nullable=False)
  watchlistId = db.Column(db.Integer, db.ForeignKey("watchlists.id"))
  watchlist = db.relationship("Watchlist")

  def to_dict(self):
    return {
      "id": self.id,
      "email": self.email,
      'firstName': self.firstName,
      'lastName' : self.lastName,
      "password": self.password,
      "balance": self.balance
    }

class Trade(db.Model):
  __tablename__ = "trades"

  id = db.Column(db.Integer, primary_key = True)
  ticker = db.Column(db.String(10), nullable= False, unique = True)
  price = db.Column(db.Integer)
  shares = db.Column(db.Integer, nullable=False)
  buy = db.Column(db.Boolean)
  buyDate = db.Column(db.DateTime, nullable=False)
  userId = db.Column(db.Integer, db.ForeignKey("users.id"))
  user = db.relationship("User")

class Stocklist(db.Model):
  __tablename__ = "stocklists"

  id = db.Column(db.Integer, primary_key = True)
  stockId = db.Column(db.Integer, db.ForeignKey("stocks.id"))
  userId = db.Column(db.Integer, db.ForeignKey("users.id"))
  shares = db.Column(db.Integer)
  user = db.relationship("User")
  stock = db.relationship("Stock")
