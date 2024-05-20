import os
from flask import jsonify, Blueprint, request
import pymongo
from bson.objectid import ObjectId

from utils import users, products, parse_json

product_bp = Blueprint('Product', __name__)


@product_bp.route('/Product/<string:product_id>/user/<string:user_id>', methods=['GET'])
def product(product_id, user_id):
    user_info = users.find_one({'_id': ObjectId(user_id)})

    current_product = products.find_one({'_id': ObjectId(product_id)})

    current_product['_id'] = str(current_product['_id'])

    combined_info = {
        'product': current_product,
        'user': user_info
    }

    return jsonify(combined_info)


@product_bp.route('/Product/all', methods=['GET'])
def get_all_products():
    all_products = products.find()
    return parse_json(all_products)


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


@product_bp.route('/Product/page', methods=['GET'])
def get_product_by_pages():
    data = request.json
    chunksize = data['size']
    page = data['page']
    gen = iterate_by_chunks(products, chunksize=chunksize)
    res = get_chunk(gen, page)
    return parse_json(res)
