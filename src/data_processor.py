import numpy as np
import pandas as pd

from utils import ratings, parse_json

if __name__ == '__main__':
    all_ratings = parse_json(ratings.find())
    df = pd.DataFrame(all_ratings)[['user_id', 'product_id', 'score']].rename(columns={'score':'rating'})
    df.to_csv('../data/ratings.csv', index=False)