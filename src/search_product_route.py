from flask import jsonify, request, Blueprint
import pymongo

search_product_bp = Blueprint('Search-product', __name__)

mongo_uri = "mongodb+srv://admin:admin123456@cluster0.6ay5uvp.mongodb.net"
client = pymongo.MongoClient(mongo_uri)
db = client["shop_manager"]
products = db["products"]

@search_product_bp.route('/Search-product/<string:query>')
def search_product(query):
    search_results = list(products.find({'$text': {'$search': query}}).limit(20))

    if not search_results:
        return jsonify({'message' : 'No products found'})
    
    for product in search_results:
        product['_id'] = str(product['_id'])
    
    return jsonify(search_results)