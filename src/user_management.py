import os

from flask import request, Blueprint
import pymongo
from bson.objectid import ObjectId

from utils import users, parse_json


user_management_bp = Blueprint('user_management', __name__)


@user_management_bp.route('/user', methods=['GET'])
def hello_pm():
    return 'Hello Kana'


@user_management_bp.route('/user/get/<string:user_id>', methods=['GET'])
def get_user(user_id):
    user = users.find_one({'_id': ObjectId(user_id)})
    return parse_json(user)


@user_management_bp.route('/user/all', methods=['GET'])
def get_all_users():
    all_users = users.find()
    return parse_json(all_users)


@user_management_bp.route('/user/set/<string:user_id>', methods=['POST'])
def set_user_profile(user_id):
    data = request.json
    uid = {'_id': ObjectId(user_id)}
    update = {
        "$set": data
    }
    users.update_one(uid, update)
    return parse_json(users.find_one(uid))
