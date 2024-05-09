from flask import jsonify, request, Blueprint
import pymongo

insert_product_bp = Blueprint('Insert-product', __name__)

mongo_uri = "mongodb+srv://admin:admin123456@cluster0.6ay5uvp.mongodb.net"
client = pymongo.MongoClient(mongo_uri)
db = client["shop_manager"]
products = db["products"]

@insert_product_bp.route('/Insert-product', methods=['POST']) 
def insert_product():
    product_data = request.json

    if 'name' not in product_data or 'price' not in product_data or 'amount' not in product_data:
        return jsonify({'error': 'Missing data'})
    
    products.insert_one(product_data)

    return jsonify({'message': 'Product added successfully'})
