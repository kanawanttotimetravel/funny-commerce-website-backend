import os
from dotenv import load_dotenv

from flask import jsonify, request, Blueprint
import pymongo
from utils import parse_json, carts

load_dotenv()


cart_bp = Blueprint('cart', __name__)

@cart_bp.route('/cart/add', methods=['POST'])
def add_to_cart():
    data = request.json
    carts.insert_one({
        'user_id': data['userId'],
        'item_id': data['itemId'],
        'name': data['itemName'],
        'price': data['price'],
        'quantity': data['quantity'],
        'img': data['imageSrc']
    })
    return parse_json({
        'message': 'ok'
    })


@cart_bp.route('/cart/get', methods=['POST'])
def get_from_cart():
    data = request.json
    user_id = data['user_id']
    res = carts.find({'user_id': user_id})
    res = [{
        'id': item['item_id'],
        'name': item['name'],
        'price': item['price'],
        'quantity': item['quantity'],
        'img': item['img']
    } for item in res]

    return parse_json({
        'message': 'ok',
        'data': res
    })

@cart_bp.route('/cart/remove', methods=['POST'])
def remove_from_cart():
    data = request.json
    user_id = data['user_id']
    item_id = data['item_id']
    print(user_id, item_id)
    carts.delete_many({'user_id': user_id, 'item_id': item_id})
    return parse_json({
        'message': 'ok'
    })

@cart_bp.route('/cart/update', methods=['POST'])
def update_quantity():
    data = request.json
    item_list = data['item_list']
    user_id = data['user_id']
    print(data)
    for item in item_list:
        item_id = item['id']
        quantity = item['quantity']
        query = {'user_id': user_id, 'item_id': item_id}
        carts.update_one(query, {'$set': {'quantity':quantity}})
    return parse_json({
        'message': 'ok'
    })