import os

from flask import request, Blueprint
import pymongo
from bson.objectid import ObjectId

from utils import parse_json


client = pymongo.MongoClient(os.environ.get("MONGO_URI"))
db = client['shop_manager']
accounts = db['accounts']

user_management_bp = Blueprint('user_management', __name__)


@user_management_bp.route('/user', methods=['GET'])
def hello_pm():
    return 'Hello Kana'


@user_management_bp.route('/user/<string:user_id>', methods=['GET'])
def get_user(user_id):
    user = accounts.find_one({'_id': ObjectId(user_id)})
    return parse_json(user)


@user_management_bp.route('/user/<string:user_id>', methods=['POST'])
def set_user_profile(user_id):
    data = request.json
    uid = {'_id': ObjectId(user_id)}
    update = {
        "$set": data
    }
    accounts.update_one(uid, update)
    return parse_json(accounts.find_one(uid))
