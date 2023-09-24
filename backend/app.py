from flask import Flask, jsonify
import requests
import config
import base64

app = Flask(__name__)
port = 3001

# Privy API credentials
privy_app_id = config.APP_ID
privy_app_secret = config.APP_SECRET

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

# Helper function to query Privy's API
def get_users(cursor=None):
    url = 'https://auth.privy.io/api/v1/users'
    # params = {'cursor': cursor} if cursor else {}

    headers = {
        'Authorization': 'Basic ' + base64.b64encode(f'{privy_app_id}:{privy_app_secret}'.encode()).decode(),
        'privy-app-id': privy_app_id,
    }

    response = requests.get(url, params=params, headers=headers)
    print(response)

    if response.status_code == 200:
        return response.json()
    else:
        return response.status_code  # Handle error cases here

@app.route('/getusers')
def get_users_route():
    cursor = request.args.get('cursor')
    users_data = get_users(cursor)

    if users_data:
        return jsonify(users_data)
    else:
        return jsonify(error='Failed to fetch users'), 500


@app.route('/ethData')
def get_eth_data():
    try:
        endpoint = "https://api.1inch.dev/portfolio/v2/prices/token_prices/time_range?chain_id=1&contract_address=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2&currency=usd&granularity=day"
        eth_response = requests.post(endpoint, headers={'Authorization': f'Bearer {config.API_KEY}'})
        return eth_response.json().get('prices', [])
    except Exception as error:
        return jsonify(error=error), 500

@app.route('/polyData')
def get_poly_data():
    try:
        endpoint = "https://api.1inch.dev/portfolio/v2/prices/token_prices/time_range?chain_id=137&contract_address=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2&currency=usd&granularity=day"
        eth_response = requests.post(endpoint, headers={'Authorization': f'Bearer {config.API_KEY}'})
        return eth_response.json().get('prices', [])
    except Exception as error:
        return jsonify(error=error), 500

@app.route('/bnbData')
def get_bnb_data():
    try:
        endpoint = "https://api.1inch.dev/portfolio/v2/prices/token_prices/time_range?chain_id=56&contract_address=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2&currency=usd&granularity=day"
        eth_response = requests.post(endpoint, headers={'Authorization': f'Bearer {config.API_KEY}'})
        return eth_response.json().get('prices', [])
    except Exception as error:
        return jsonify(error=error), 500

if __name__ == '__main__':
    app.run(port=port)
