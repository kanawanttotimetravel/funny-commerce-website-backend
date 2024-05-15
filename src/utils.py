import json
from bson import json_util


def parse_json(obj):
    return json.loads(json_util.dumps(obj))