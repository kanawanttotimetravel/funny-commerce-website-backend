import os

from dotenv import load_dotenv

from flask import Flask
from flask_cors import CORS, cross_origin

from insert_product_route import insert_product_bp
from delete_product_route import delete_product_bp
from authentication import authentication_bp
from user_management import user_management_bp
from update_product_route import update_product_bp
from search_product_route import search_product_bp
from product_route import product_bp
from rating_route import rating_bp
from cart import cart_bp

load_dotenv()
app = Flask(__name__)

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

app.register_blueprint(insert_product_bp)
app.register_blueprint(delete_product_bp)
app.register_blueprint(authentication_bp)
app.register_blueprint(user_management_bp)
app.register_blueprint(update_product_bp)
app.register_blueprint(search_product_bp)
app.register_blueprint(product_bp)
app.register_blueprint(rating_bp)
app.register_blueprint(cart_bp)

@app.route('/')
def hello_world():
    return 'Hello World!!!'


if __name__ == "__main__":
    port = os.environ.get("PORT", 5000)
    app.run(debug=True, host= "0.0.0.0", port=port)
