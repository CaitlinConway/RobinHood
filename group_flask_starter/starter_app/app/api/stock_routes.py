from flask import Blueprint


bp = Blueprint("stocks", __name__)

@bp.route("/<stockId>")
def stock(stockId):
    print(stockId)
    return;
