from django.contrib.auth.models import User
from rest_framework.test import APITestCase
from rest_framework import status


class AuthenticationTests(APITestCase):

    def test_register(self):
        data = {
            "username": "urmila",
            "email": "utsabithalal@gmail.com",
            "password": "urmila@123"
        }

        response = self.client.post("/api/register/", data)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 1)

    def test_login(self):
        User.objects.create_user(
            username="urmila",
            password="urmila@123"
        )

        response = self.client.post("/api/login/", {
            "username": "urmila",
            "password": "urmila@123"
        })

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("access", response.data)
        self.assertIn("refresh", response.data)