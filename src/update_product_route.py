import os
from flask import jsonify, Blueprint, request
import pymongo
from bson.objectid import ObjectId

from utils import products

update_product_bp = Blueprint('Update-product', __name__)


@update_product_bp.route('/Update-product', methods=['GET'])
def render_products():
    product_list = list(products.find())

    for product in product_list:
        product['_id'] = str(product['_id'])

    return jsonify(product_list)

@update_product_bp.route('/Update-product/<string:product_id>', methods=['GET','PUT'])
def update_product(product_id):
    if request.method == 'PUT':
        new_data = request.json

        products.update_one({'_id': ObjectId(product_id)}, {'$set': new_data})

        return jsonify({'message': 'Updated'})
    elif request.method == 'GET':
        current_product = products.find_one({'_id' : ObjectId(product_id)})

        current_product['_id'] = str(current_product['_id'])

        return jsonify(current_product)