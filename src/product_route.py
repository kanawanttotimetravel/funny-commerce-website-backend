import os
from flask import jsonify, Blueprint, request
from flask_cors import CORS, cross_origin
import pymongo
from bson.objectid import ObjectId

from utils import users, products, parse_json

from recommender import rcm

product_bp = Blueprint('Product', __name__)


# @product_bp.route('/Product/<string:product_id>/user/<string:user_id>', methods=['GET'])
# def product(product_id, user_id):
#     user_info = users.find_one({'_id': ObjectId(user_id)})
#
#     current_product = products.find_one({'_id': ObjectId(product_id)})
#
#     current_product['_id'] = str(current_product['_id'])
#
#     combined_info = {
#         'product': current_product,
#         'user': user_info
#     }
#
#     return jsonify(combined_info)

def conversion(product):
    return {
        'itemId': str(product['_id']),
        'itemName': product['product_name'],
        'itemAmount': product['amount'],
        'imageSrc': product['image'] if isinstance(product['image'], str) else product['image'][0],
        'itemType': product['categories'],
        'price': product['price'],
        'itemInfo': product['info']
    }


@product_bp.route('/Product/all', methods=['GET'])
def get_all_products():
    all_products = products.find()
    return parse_json(all_products)


@product_bp.route('/Product/<string:product_id>/', methods=['GET'])
def product(product_id):
    product = products.find_one({'_id': ObjectId(product_id)})
    return parse_json(conversion(product))



@product_bp.route('/Product/<string:product_id>/related', methods=['GET'])
def related_product(product_id):
    related = rcm.most_similar(product_id)
    res = [conversion(products.find_one({'_id': ObjectId(id)})) for id in related]
    return parse_json(res)


@product_bp.route('/recommend', methods=['POST'])
def recommend():
    data = request.get_json()
    user_id = data['user_id']
    recommendations = rcm.recommend(user_id)
    res = [conversion(products.find_one({'_id': ObjectId(id)})) for id in recommendations]
    return parse_json(res)


def iterate_by_chunks(collection, chunksize=1, start_from=0, query={}, projection={}):
    chunks = range(start_from, collection.count_documents(query), int(chunksize))
    num_chunks = len(chunks)
    for i in range(1, num_chunks + 1):
        if i < num_chunks:
            yield collection.find(query, projection=projection)[chunks[i - 1]:chunks[i]]
        else:
            yield collection.find(query, projection=projection)[chunks[i - 1]:chunks.stop]


def get_chunk(generator, n):
    dummy = [_ for _ in range(n - 1) if next(generator) and False]
    return next(generator)


@product_bp.route('/Product/page', methods=['POST'])
@cross_origin()
def get_product_by_pages():
    data = request.json
    chunk_size = data['size']
    page = data['page']
    page_count = products.count_documents({}) // chunk_size + 1
    gen = iterate_by_chunks(products, chunksize=chunk_size)
    res = get_chunk(gen, page)
    product_list = [conversion(product) for product in res]
    return parse_json({
        'page_count': page_count,
        'data': product_list}
    )
