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

    def test_5_dummy_users(self):
        users = [
            {
                "username": "user1",
                "email": "user1@gmail.com",
                "password": "User@123"
            },
            {
                "username": "user2",
                "email": "user2@gmail.com",
                "password": "User@123"
            },
            {
                "username": "user3",
                "email": "user3@gmail.com",
                "password": "User@123"
            },
            {
                "username": "user4",
                "email": "user4@gmail.com",
                "password": "User@123"
            },
            {
                "username": "user5",
                "email": "user5@gmail.com",
                "password": "User@123"
            }
        ]

        for user in users:
            # Register
            register_response = self.client.post("/api/register/", user)
            self.assertEqual(register_response.status_code, status.HTTP_201_CREATED)

            # Login
            login_response = self.client.post("/api/login/", {
                "username": user["username"],
                "password": user["password"]
            })

            self.assertEqual(login_response.status_code, status.HTTP_200_OK)
            self.assertIn("access", login_response.data)
            self.assertIn("refresh", login_response.data)