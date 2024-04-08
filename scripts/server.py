# from requests import Request, Session
# from requests.exceptions import ConnectionError, Timeout, TooManyRedirects
# import json
# from flask import Flask, jsonify, request
# from flask_cors import CORS

# coinAPIKEY = ""

# url = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/map"

# cryptos = []

# app = Flask(__name__)
# CORS(app)

# @app.route('/prices')
# def get_price():
#   symbols = request.args.get("symbol")

#   parameters = {
#       "symbol" : symbols
#   }

#   headers = {
#     'Accepts': 'application/json',
#     'X-CMC_PRO_API_KEY': coinAPIKEY,
#   }

#   symbols = symbols.split(",")
#   session = Session()
#   session.headers.update(headers)
#   response = session.get("https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest", params=parameters)
#   data = json.loads(response.text)
#   prices = {}
#   for symbol in symbols:
#     price = data["data"][symbol][0]["quote"]["USD"]["price"]
#     prices[symbol] =  price
#   return jsonify(prices)

# @app.route("/stockPrices")
# def getStocks():
#     symbols  = request.args.get("symbols")
#     headers = {
#         'X-RapidAPI-Key': 'dd54c567bdmshbc2da4da544ff1bp1ffc40jsn2708e9551e62',
#         'X-RapidAPI-Host': 'yahoo-finance127.p.rapidapi.com'
#     }

#     session = Session()
#     session.headers.update(headers)
#     response = session.get('https://yahoo-finance127.p.rapidapi.com/multi-quote/'+symbols)
#     data = json.loads(response.text)
#     res = {}
#     for item in symbols:
#         res[item] = data
#     return jsonify(res)

# def rewriteCryptoList():
#   parameters = {
#     'limit':'400',
#     'sort' : 'cmc_rank'
#   }

#   headers = {
#     'Accepts': 'application/json',
#     'X-CMC_PRO_API_KEY': coinAPIKEY,
#   }

#   session = Session()
#   session.headers.update(headers)
#   try:
#       response = session.get(url, params=parameters)
#       data = json.loads(response.text)
#       for item in data["data"]:
#           name = item["name"]
#           symbol = item["symbol"]
#           cryptos.append({"name" : name, "symbol" : symbol})
#       with open("C:/Users/miste/OneDrive - BCIT/BCIT/1800_2024/Assignments/Labs/1800_202410_bby23/data/cryptos.json", "w") as file:
#         json.dump(cryptos,file, indent=4)
#   except (ConnectionError, Timeout, TooManyRedirects) as e:
#     print(e)





# if __name__ == '__main__':
#      app.run()
