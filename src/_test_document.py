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
        self.path = 'http://127.0.0.1:5000/api/v1/documents'
        self.person_path = 'http://127.0.0.1:5000/api/v1/persons'
        self.path_first_document = self.path + '/1'
        self.path_fake_document = self.path + '/100'
        self.data = {
            "person_id": 1,
            "number": "2020-00001",
            "date": "2020-12-31",
            "document_type": "FACTURA",
            "sub_total": 200.0,
            "discount": 10.0,
            "tax": 16.0,
            "total": 220,  # 200 - 10 = 190 x 1.16 = 220.4
            "exchange_rate": 438319.92
        }
        self.person_data = {
            "tax_id": "J310037221",
            "firstname": "HK Soluciones, C.A.",
            "lastname": "",
            "address": "Av. Intercomunal C.C. Cristal Plaza piso 1 Oficina 9",
            "city": "Barcelona",
            "state": "Anzoategui",
            "phone": "0281-2866220",
            "email": "hksistemas@gmail.com",
            "active": True,
            "price": 1
        }
        self.data_to_update = {
            "sub_total": 180.0,
            "discount": 00.0,
            "exchange_rate": 800
        }

    def tearDown(self):
        with self.app.app_context():
            db.drop_all()

    def test_get_all_documents(self):
        response = self.client.get(path=self.path)
        self.assertEqual(response.status_code, 200)

    def get_document_id(self, response):
        data = json.loads(response.data.decode('utf-8'))
        return data['data']['id']

    def get_person_id(self, response):
        data = json.loads(response.data.decode('utf-8'))
        return data['data']['id']

    def test_get_first_document(self):

        response = self.client.post(path=self.path, data=json.dumps(self.data),
                                    content_type=self.content_type)

        self.assertEqual(response.status_code, 200)

        response = self.client.get(path=self.path_first_document,
                                   content_type=self.content_type)

        self.assertEqual(response.status_code, 200)

        document_id = self.get_document_id(response)

        self.assertEqual(document_id, 1)

    def test_not_found(self):
        response = self.client.get(path=self.path_fake_document,
                                   content_type=self.content_type)

        self.assertEqual(response.status_code, 404)

    def test_create_document(self):

        response = self.client.post(path=self.person_path, data=json.dumps(self.person_data),
                                    content_type=self.content_type)

        self.assertEqual(response.status_code, 200)

        person_id = self.get_person_id(response)

        print(person_id)

        response = self.client.post(path=self.path, data=json.dumps(self.data),
                                    content_type=self.content_type)

        self.assertEqual(response.status_code, 200)

        document_id = self.get_document_id(response)

        self.assertEqual(document_id, 1)

    def test_update_document(self):
        response = self.client.post(path=self.path, data=json.dumps(self.data),
                                    content_type=self.content_type)

        self.assertEqual(response.status_code, 200)

        response = self.client.put(path=self.path_first_document,
                                   data=json.dumps(self.data_to_update),
                                   content_type=self.content_type)

        self.assertEqual(response.status_code, 200)

        data = json.loads(response.data.decode('utf-8'))
        total = data['data']['total']
        # total  180 - 0 = 180 * 1.16 = 208.8
        self.assertEqual(total, 208.8)

    def test_delete_document(self):
        response = self.client.post(path=self.path, data=json.dumps(self.data),
                                    content_type=self.content_type)

        self.assertEqual(response.status_code, 200)

        response = self.client.delete(path=self.path_first_document,
                                      content_type=self.content_type)

        self.assertEqual(response.status_code, 200)

        response = self.client.get(path=self.path_first_document,
                                   content_type=self.content_type)

        self.assertEqual(response.status_code, 404)


if __name__ == '__main__':
    unittest.main()
