import unittest

from app import app


class AppTestCase(unittest.TestCase):
    def setUp(self):
        self.ctx = app.app_context()
        self.ctx.push()
        self.client = app.test_client()

    def tearDown(self):
        self.ctx.pop()

    def test_home(self):
        response = self.client.get("/", )
        assert response.status_code == 200

    def test_login_admin(self):
        dummy_username = "Admin"
        dummy_password = 'Admin123456'
        response = self.client.post("/login", headers={
            'Content-type': 'application/json',
            'Accept': 'application/json'
        }, json={
            'username': dummy_username,
            'password': dummy_password
        })
        assert response.status_code == 200
        data = response.json
        assert data['message'] == 'ok'
        assert data['type'] == 'admin'

    def test_customer(self):
        dummy_username = "user001"
        dummy_password = 'pass001'
        response = self.client.post("/login", headers={
            'Content-type': 'application/json',
            'Accept': 'application/json'
        }, json={
            'username': dummy_username,
            'password': dummy_password
        })
        assert response.status_code == 200
        data = response.json
        assert data['message'] == 'ok'
        assert data['type'] == 'buyer'

    def test_get_all_product(self):
        response = self.client.post("/get", headers={
            'Content-type': 'application/json',
            'Accept': 'application/json'
        })
        assert response.status_code == 200
        data = response.json
        assert data['message'] == 'ok'
        assert data['type'] == 'buyer'

if __name__ == "__main__":
    unittest.main()
