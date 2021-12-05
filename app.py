from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)

CORS(app, resources={r'/*': {'origins': '*'}})

@app.route("/")
@app.route("/api/ping", methods = ['GET', 'POST'])
def index():
	return jsonify("PONG")


if __name__ == '__main__':
	app.run(debug=True)