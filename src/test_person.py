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
        self.path = 'http://127.0.0.1:5000/api/v1/persons'
        self.path_first_person = self.path + '/1'
        self.path_fake_person = self.path + '/100'
        self.data = {
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
            'firstname': 'HK Sistemas, C.A.',
            'city': 'Caracas',
            'price': 4
        }

    def tearDown(self):
        with self.app.app_context():
            db.drop_all()

    def test_get_all_persons(self):
        response = self.client.get(path=self.path)
        self.assertEqual(response.status_code, 200)

    def get_person_id(self, response):
        data = json.loads(response.data.decode('utf-8'))
        return data['data']['id']

    def test_get_first_person(self):
        response = self.client.post(path=self.path, data=json.dumps(self.data),
                                    content_type=self.content_type)

        self.assertEqual(response.status_code, 200)

        response = self.client.get(path=self.path_first_person,
                                   content_type=self.content_type)

        self.assertEqual(response.status_code, 200)

        person_id = self.get_person_id(response)

        self.assertEqual(person_id, 1)

    def test_not_found(self):
        response = self.client.get(path=self.path_fake_person,
                                   content_type=self.content_type)

        self.assertEqual(response.status_code, 404)

    def test_create_person(self):
        response = self.client.post(path=self.path, data=json.dumps(self.data),
                                    content_type=self.content_type)

        self.assertEqual(response.status_code, 200)

        person_id = self.get_person_id(response)

        self.assertEqual(person_id, 1)

    def test_update_person(self):
        response = self.client.post(path=self.path, data=json.dumps(self.data),
                                    content_type=self.content_type)

        self.assertEqual(response.status_code, 200)

        response = self.client.put(path=self.path_first_person,
                                   data=json.dumps(self.data_to_update),
                                   content_type=self.content_type)

        self.assertEqual(response.status_code, 200)

        data = json.loads(response.data.decode('utf-8'))
        city = data['data']['city']

        self.assertEqual(city, self.data_to_update['city'])

    def test_delete_person(self):
        response = self.client.post(path=self.path, data=json.dumps(self.data),
                                    content_type=self.content_type)

        self.assertEqual(response.status_code, 200)

        response = self.client.delete(path=self.path_first_person,
                                      content_type=self.content_type)

        self.assertEqual(response.status_code, 200)

        response = self.client.get(path=self.path_first_person,
                                   content_type=self.content_type)

        self.assertEqual(response.status_code, 404)


if __name__ == '__main__':
    unittest.main()
