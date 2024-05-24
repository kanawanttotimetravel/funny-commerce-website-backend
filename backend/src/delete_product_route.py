import os
from flask import jsonify, Blueprint
import pymongo
from bson.objectid import ObjectId

from utils import products

delete_product_bp = Blueprint('Delete-product', __name__)



@delete_product_bp.route('/Delete-product', methods=['GET'])
def render_products():
    product_list = list(products.find())

    for product in product_list:
        product['_id'] = str(product['_id'])

    return jsonify(product_list)


@delete_product_bp.route('/Delete-product/<string:product_id>', methods=['DELETE'])
def delete_product(product_id):
    if not ObjectId.is_valid(product_id):
        return jsonify({'error': 'Invalid id'})
    
    product = products.find_one({'_id' : ObjectId(product_id)})
    if product is None:
        return jsonify({'error': 'Not found'})
    
    products.delete_one({'_id': ObjectId(product_id)})

    return jsonify({'message': 'Deleted'})