from dotenv import load_dotenv

from flask import Flask
from insert_product_route import insert_product_bp
from delete_product_route import delete_product_bp
from authentication import authentication_bp
from user_management import user_management_bp
from update_product_route import update_product_bp
from search_product_route import search_product_bp
from product_route import product_bp

load_dotenv()
app = Flask(__name__)

app.register_blueprint(insert_product_bp)
app.register_blueprint(delete_product_bp)
app.register_blueprint(authentication_bp)
app.register_blueprint(user_management_bp)
app.register_blueprint(update_product_bp)
app.register_blueprint(search_product_bp)
app.register_blueprint(product_bp)
@app.route('/')
def hello_world():
    return 'Hello World!!!'


if __name__ == "__main__":
    app.run(debug=True)