import os
import json
from bson import json_util
import dotenv
import pymongo

dotenv.load_dotenv()

MONGO_URI = os.environ.get("MONGO_URI")
MONGO_CLIENT = pymongo.MongoClient(MONGO_URI)
MONGO_DATABASE = MONGO_CLIENT["shop_manager"]
products = MONGO_DATABASE["products"]
users = MONGO_DATABASE["users"]
ratings = MONGO_DATABASE["ratings"]
queues = MONGO_DATABASE["queues"]
carts = MONGO_DATABASE["carts"]


def parse_json(obj):
    return json.loads(json_util.dumps(obj))