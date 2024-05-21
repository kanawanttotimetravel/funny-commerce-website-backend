import os
from flask import jsonify, request, Blueprint
import pymongo

from utils import products

search_product_bp = Blueprint('Search-product', __name__)



@search_product_bp.route('/Search-product/<string:query>')
def search_product(query):
    search_results = list(products.find({'$text': {'$search': query}}).limit(20))

    if not search_results:
        return jsonify({'message' : 'No products found'})
    
    for product in search_results:
        product['_id'] = str(product['_id'])
    
    return jsonify(search_results)