from flask import Flask
from insert_product_route import insert_product_bp
from delete_product_route import delete_product_bp
from authentication import authentication_bp
from user_management import user_management_bp
app = Flask(__name__)

app.register_blueprint(insert_product_bp)
app.register_blueprint(delete_product_bp)
app.register_blueprint(authentication_bp)
app.register_blueprint(user_management_bp)

@app.route('/')
def hello_world():
    return 'Hello World!!!'


if __name__ == "__main__":
    app.run(debug=True)