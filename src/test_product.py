import json
import unittest

from models import db
from app import create_app

from config import config

class TestAPI(unittest.TestCase):
    def setUp(self):
        enviroment = config['test']
        self.app = create_app(enviroment)
        self.client = self.app.test_client()

        self.content_type = 'application/json'
        self.path = 'http://127.0.0.1:5000/api/v1/products'
        self.path_first_product = self.path + '/1'
        self.path_fake_product = self.path + '/100'
        self.data = {
               "sku": "FVE01321",
                "description": "ABC AROMA BEBE 30X400g",
                "tax": 12.0,
                "price": 232.79,
                "departament": "PRODUCTOS",
                "stock": 0,
                "unit": "BT"
        }
        self.data_to_update = { 'description': 'ABC SUAVITEL 18X810G' }

    def tearDown(self):
        with self.app.app_context():
            db.drop_all()
    
    def test_get_all_products(self):
        response = self.client.get(path=self.path)
        self.assertEqual(response.status_code, 200)

    def get_product_id(self, response):
        data = json.loads(response.data.decode('utf-8'))
        return data['data']['id']

    def test_get_first_product(self):
        response = self.client.post(path=self.path, data=json.dumps(self.data),
                            content_type=self.content_type)
        
        self.assertEqual(response.status_code, 200)

        response = self.client.get(path=self.path_first_product,
                                    content_type=self.content_type)

        self.assertEqual(response.status_code, 200)

        product_id = self.get_product_id(response)
        
        self.assertEqual(product_id, 1)

    def test_not_found(self):
        response = self.client.get(path=self.path_fake_product,
                                    content_type=self.content_type)
        
        self.assertEqual(response.status_code, 404)

    def test_create_product(self):
        response = self.client.post(path=self.path, data=json.dumps(self.data),
                                    content_type=self.content_type)
        
        self.assertEqual(response.status_code, 200)
        
        product_id = self.get_product_id(response)
        
        self.assertEqual(product_id, 2)

    def test_update_product(self):
        response = self.client.put(path=self.path_first_product,
                                    data=json.dumps(self.data_to_update),
                                    content_type=self.content_type)

        self.assertEqual(response.status_code, 200)
        
        data = json.loads(response.data.decode('utf-8'))
        description = data['data']['description']
        
        self.assertEqual(description, self.data_to_update['description'])

    def test_delete_product(self):
        response = self.client.delete(path=self.path_first_product,
                                        content_type=self.content_type)

        self.assertEqual(response.status_code, 200)
        
        response = self.client.get(path=self.path_first_product,
                                    content_type=self.content_type)

        self.assertEqual(response.status_code, 404)

if __name__ == '__main__':
    unittest.main()