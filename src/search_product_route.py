import os
from flask import jsonify, request, Blueprint
from pymongo import TEXT

from utils import products

search_product_bp = Blueprint('Search-product', __name__)

indexes = products.index_information()

if 'name_text' in indexes:
    products.drop_index('name_text')

products.create_index([('name', TEXT), ('info', TEXT)])

@search_product_bp.route('/Search-product/<string:query>', methods=['GET'])
def search_product(query):
    search_results = list(products.find({'$text': {'$search': query}}).limit(20))

    if not search_results:
        return jsonify({'message': 'No products found'})
    
    for product in search_results:
        product['_id'] = str(product['_id'])
        product['price'] = product['price'] * 300

    return jsonify(search_results)
