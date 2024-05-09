from flask import jsonify, Blueprint
import pymongo
from bson.objectid import ObjectId

delete_product_bp = Blueprint('Delete-product', __name__)

mongo_uri = "mongodb+srv://admin:admin123456@cluster0.6ay5uvp.mongodb.net"
client = pymongo.MongoClient(mongo_uri)
db = client["shop_manager"]
products = db["products"]

@delete_product_bp.route('/Delete-product/<string:product_id>', methods=['DELETE'])
def delete_product(product_id):
    if not ObjectId.is_valid(product_id):
        return jsonify({'error': 'Invalid id'})
    
    product = products.find_one({'_id' : ObjectId(product_id)})
    if product is None:
        return jsonify({'error': 'Not found'})
    
    products.delete_one({'_id': ObjectId(product_id)})

    return jsonify({'message': 'Deleted'})