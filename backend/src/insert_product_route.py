import os
from flask import jsonify, request, Blueprint
import pymongo

from utils import products

insert_product_bp = Blueprint('Insert-product', __name__)



@insert_product_bp.route('/Insert-product', methods=['GET','POST'])
def insert_product():
    if request.method == 'POST':
        product_data = request.json

        if 'name' not in product_data or 'price' not in product_data or 'amount' not in product_data:
            return jsonify({'error': 'Missing data'})
        
        products.insert_one(product_data)

        return jsonify({'message': 'Product added successfully'})
    if request.method == 'GET':
        return jsonify({'Form': 'Infomation'})