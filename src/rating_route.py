import os
from flask import jsonify, Blueprint, request
import pymongo
from bson.objectid import ObjectId

from utils import users, products, ratings, parse_json

import numpy as np


rating_bp = Blueprint('rating', __name__)


@rating_bp.route('/rating/all', methods=['GET'])
def get_all_ratings():
    print(ratings)
    all_ratings = ratings.find()
    return parse_json(all_ratings)

@rating_bp.route('/rating/', methods=['POST'])
def get_product_rating():
    data = request.json
    query = {
        'product_id': data['product_id']
    }
    all_ratings = ratings.find(query)
    vals = [rating['score'] for rating in all_ratings]
    res = np.array(vals).mean()
    return parse_json({'score': round(res, 2)})