import os
from flask import jsonify, Blueprint, request
import pymongo
from bson.objectid import ObjectId

from utils import users, products, parse_json

product_bp = Blueprint('Product', __name__)


@product_bp.route('/Product/<string:product_id>/user/<string:user_id>', methods=['GET'])
def product(product_id, user_id):
    user_info = users.find_one({'_id': ObjectId(user_id)})

    current_product = products.find_one({'_id' : ObjectId(product_id)})

    current_product['_id'] = str(current_product['_id'])

    combined_info = {
        'product': current_product,
        'user': user_info
    }

    return jsonify(combined_info)

@product_bp.route('/Product/all', methods=['GET'])
def get_all_products():
    data = products.find()
    return parse_json(data)