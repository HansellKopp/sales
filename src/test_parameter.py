import json
import unittest

from models import db
from models.parameter import Parameter
from app import create_app

from config import config


class TestAPI(unittest.TestCase):
    def setUp(self):
        enviroment = config['test']
        self.app = create_app(enviroment)
        self.client = self.app.test_client()

        self.content_type = 'application/json'
        self.path = 'http://127.0.0.1:5000/api/v1/parameters'
        self.path_first_parameter = self.path + '/1'
        self.path_fake_parameter = self.path + '/100'
        self.data = {
            "exchange": 4500.00,
            "tax_id": "J310037221",
            "name": "Distribución Aromacon",
            "address": "CC Cristal Plaza, piso 1 of 9 - Barcelona",
            "last_invoice": 0
        }
        self.data_to_update = {'name': 'HK Soluciones, c.a.'}

    def tearDown(self):
        with self.app.app_context():
            db.drop_all()

    def test_get_all_parameters(self):
        response = self.client.get(path=self.path)
        self.assertEqual(response.status_code, 200)

    def get_parameter_id(self, response):
        data = json.loads(response.data.decode('utf-8'))
        return data['data']['id']


    def test_get_first_parameter(self):
        response = self.client.post(path=self.path, data=json.dumps(self.data),
                                    content_type=self.content_type)

        self.assertEqual(response.status_code, 200)

        response = self.client.get(path=self.path_first_parameter,
                                   content_type=self.content_type)

        self.assertEqual(response.status_code, 200)

        offer_id = self.get_parameter_id(response)

        self.assertEqual(offer_id, 1)

    def test_not_found(self):
        response = self.client.get(path=self.path_fake_parameter,
                                   content_type=self.content_type)

        self.assertEqual(response.status_code, 404)

    def test_create_parameter(self):
        response = self.client.post(path=self.path, data=json.dumps(self.data),
                                    content_type=self.content_type)

        self.assertEqual(response.status_code, 200)

    def test_update_parameter(self):
        response = self.client.post(path=self.path, data=json.dumps(self.data),
                                    content_type=self.content_type)

        self.assertEqual(response.status_code, 200)

        response = self.client.put(path=self.path_first_parameter,
                                   data=json.dumps(self.data_to_update),
                                   content_type=self.content_type)

        self.assertEqual(response.status_code, 200)

        data = json.loads(response.data.decode('utf-8'))
        print(data)
        description = data['data']['name']

        self.assertEqual(description, self.data_to_update['name'])

    def test_delete_parameter(self):
        response = self.client.post(path=self.path, data=json.dumps(self.data),
                                    content_type=self.content_type)

        self.assertEqual(response.status_code, 200)

        response = self.client.delete(path=self.path_first_parameter,
                                      content_type=self.content_type)

        self.assertEqual(response.status_code, 200)

        response = self.client.get(path=self.path_first_parameter,
                                   content_type=self.content_type)

        self.assertEqual(response.status_code, 404)


if __name__ == '__main__':
    unittest.main()
