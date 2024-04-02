from requests import Request, Session
from requests.exceptions import ConnectionError, Timeout, TooManyRedirects
import json

coinAPIKEY = "4e3b1866-0baf-40cc-97ea-241926a1b9ce"

url = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/map"

cryptos = []

parameters = {
  'limit':'400',
  'sort' : 'cmc_rank'
}

headers = {
  'Accepts': 'application/json',
  'X-CMC_PRO_API_KEY': coinAPIKEY,
}

session = Session()
session.headers.update(headers)

try:
    response = session.get(url, params=parameters)
    data = json.loads(response.text)
    for item in data["data"]:
        name = item["name"]
        symbol = item["symbol"]
        cryptos.append({"name" : name, "symbol" : symbol})
    with open("C:/Users/miste/OneDrive - BCIT/BCIT/1800_2024/Assignments/Labs/1800_202410_bby23/data/cryptos.json", "w") as file:
       json.dump(cryptos,file, indent=4)
except (ConnectionError, Timeout, TooManyRedirects) as e:
  print(e)