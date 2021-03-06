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
        self.path = 'http://127.0.0.1:5000/api/v1/users'
        self.path_first_user = self.path + '/1'
        self.path_fake_user = self.path + '/100'
        self.data = {
            'username': 'admin','email': 'admin2@sales.com', 'password': 'password'
        }
        self.data_to_update = { 'email': 'admin2@sales.com' }

    def tearDown(self):
        with self.app.app_context():
            db.drop_all()
    
    def test_get_all_users(self):
        response = self.client.get(path=self.path)
        self.assertEqual(response.status_code, 200)

    def get_user_id(self, response):
        data = json.loads(response.data.decode('utf-8'))
        return data['data']['id']

    def test_get_first_user(self):
        response = self.client.get(path=self.path_first_user,
                                    content_type=self.content_type)

        self.assertEqual(response.status_code, 200)

        user_id = self.get_user_id(response)
        
        self.assertEqual(user_id, 1)

    def test_not_found(self):
        response = self.client.get(path=self.path_fake_user,
                                    content_type=self.content_type)
        
        self.assertEqual(response.status_code, 404)

    def test_create_user(self):
        response = self.client.post(path=self.path, data=json.dumps(self.data),
                                    content_type=self.content_type)
        
        self.assertEqual(response.status_code, 200)
        
        user_id = self.get_user_id(response)
        
        self.assertEqual(user_id, 2)

    def test_update_user(self):
        response = self.client.put(path=self.path_first_user,
                                    data=json.dumps(self.data_to_update),
                                    content_type=self.content_type)

        self.assertEqual(response.status_code, 200)
        
        data = json.loads(response.data.decode('utf-8'))
        email = data['data']['email']
        
        self.assertEqual(email, self.data_to_update['email'])

    def test_delete_user(self):
        response = self.client.delete(path=self.path_first_user,
                                        content_type=self.content_type)

        self.assertEqual(response.status_code, 200)
        
        response = self.client.get(path=self.path_first_user,
                                    content_type=self.content_type)

        self.assertEqual(response.status_code, 404)

if __name__ == '__main__':
    unittest.main()