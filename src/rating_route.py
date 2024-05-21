import os
from flask import jsonify, Blueprint, request
import pymongo
from bson.objectid import ObjectId

from utils import users, products, ratings, parse_json

rating_bp = Blueprint('rating', __name__)


@rating_bp.route('/rating/all', methods=['GET'])
def get_all_ratings():
    print(ratings)
    all_ratings = ratings.find()
    return parse_json(all_ratings)

