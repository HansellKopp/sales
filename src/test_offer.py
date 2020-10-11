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
        self.path = 'http://127.0.0.1:5000/api/v1/offers'
        self.path_products = 'http://127.0.0.1:5000/api/v1/products'
        self.path_first_offer = self.path + '/1'
        self.path_fake_offer = self.path + '/100'
        self.data = {
            "product_id": 1,
            "cost" : 0,
            "price" : 50,
            "quantity": 4,
            "starts_at": "2020-01-01",
            "ends_at": "2021-01-01",
            "description":"Cherry Royal"
        }
        self.data_product = {
            "departament": "Grupo A",
            "sku": "005",
            "description":"Cherry Royal",
            "cost": 0,
            "tax": 0.16,
            "price" : 18, 
            "price_2": 10,
            "price_3": 5,
            "stock":0,
            "minimum":0,
        }
        self.data_to_update = {'description': 'Cherry Royal 4KG'}

    def tearDown(self):
        with self.app.app_context():
            db.drop_all()

    def create_product(self):
        response = self.client.post(path=self.path_products, data=json.dumps(self.data_product),
                        content_type=self.content_type)
        self.assertEqual(response.status_code, 200)

    def test_get_all_offers(self):
        response = self.client.get(path=self.path)
        self.assertEqual(response.status_code, 200)

    def get_offer_id(self, response):
        data = json.loads(response.data.decode('utf-8'))
        return data['data']['id']

    def test_get_first_offer(self):
        response = self.client.post(path=self.path, data=json.dumps(self.data),
                                    content_type=self.content_type)

        self.assertEqual(response.status_code, 200)

        response = self.client.get(path=self.path_first_offer,
                                   content_type=self.content_type)

        self.assertEqual(response.status_code, 200)

        offer_id = self.get_offer_id(response)

        self.assertEqual(offer_id, 1)

    def test_not_found(self):
        response = self.client.get(path=self.path_fake_offer,
                                   content_type=self.content_type)

        self.assertEqual(response.status_code, 404)

    def test_create_offer(self):
        self.create_product()
        response = self.client.post(path=self.path, data=json.dumps(self.data),
                                    content_type=self.content_type)

        self.assertEqual(response.status_code, 200)

    def test_update_offer(self):
        response = self.client.post(path=self.path, data=json.dumps(self.data),
                                    content_type=self.content_type)

        self.assertEqual(response.status_code, 200)

        response = self.client.put(path=self.path_first_offer,
                                   data=json.dumps(self.data_to_update),
                                   content_type=self.content_type)

        self.assertEqual(response.status_code, 200)

        data = json.loads(response.data.decode('utf-8'))
        description = data['data']['description']

        self.assertEqual(description, self.data_to_update['description'])

    def test_delete_offer(self):
        response = self.client.post(path=self.path, data=json.dumps(self.data),
                                    content_type=self.content_type)

        self.assertEqual(response.status_code, 200)

        response = self.client.delete(path=self.path_first_offer,
                                      content_type=self.content_type)

        self.assertEqual(response.status_code, 200)

        response = self.client.get(path=self.path_first_offer,
                                   content_type=self.content_type)

        self.assertEqual(response.status_code, 404)


if __name__ == '__main__':
    unittest.main()
