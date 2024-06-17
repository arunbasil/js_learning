# conftest.py

import pytest
from faker import Faker

fake = Faker()

@pytest.fixture
def base_url():
    return "https://api.example.com/v1/confirmation-of-payee"

@pytest.fixture
def valid_payee_data():
    return {
        "account_number": fake.bban(),
        "sort_code": fake.bban(),
        "payee_name": fake.name(),
        "reference": fake.word()
    }

@pytest.fixture
def invalid_payee_data():
    return {
        "account_number": "invalid_account",
        "sort_code": "invalid_sort_code",
        "payee_name": "",  # Invalid payee name
        "reference": fake.word()
    }


# test_confirmation_of_payee.py

import pytest
import requests

def test_confirm_payee_valid(base_url, valid_payee_data):
    response = requests.post(f"{base_url}/confirm", json=valid_payee_data)
    assert response.status_code == 200
    json_data = response.json()
    assert "payee_confirmation" in json_data
    assert json_data["payee_confirmation"] == "Confirmed"

def test_confirm_payee_invalid_account(base_url, invalid_payee_data):
    response = requests.post(f"{base_url}/confirm", json=invalid_payee_data)
    assert response.status_code == 400
    json_data = response.json()
    assert "error" in json_data
    assert json_data["error"]["code"] == "INVALID_ACCOUNT_DETAILS"
    assert json_data["error"]["message"] == "The account details provided are invalid."

def test_confirm_payee_missing_fields(base_url):
    incomplete_data = {
        "account_number": fake.bban(),
        "sort_code": fake.bban(),
        # Missing payee_name and reference
    }
    response = requests.post(f"{base_url}/confirm", json=incomplete_data)
    assert response.status_code == 422
    json_data = response.json()
    assert "error" in json_data
    assert json_data["error"]["code"] == "MISSING_REQUIRED_FIELDS"
    assert json_data["error"]["message"] == "The request is missing required fields."

def test_confirm_payee_not_found(base_url, valid_payee_data):
    # Simulate a valid payee data but the payee is not found in the bank records
    response = requests.post(f"{base_url}/confirm", json=valid_payee_data)
    assert response.status_code == 404
    json_data = response.json()
    assert "error" in json_data
    assert json_data["error"]["code"] == "PAYEE_NOT_FOUND"
    assert json_data["error"]["message"] == "The payee could not be found."

def test_confirm_payee_internal_server_error(base_url, valid_payee_data):
    # Simulate an internal server error response
    response = requests.post(f"{base_url}/confirm", json=valid_payee_data)
    assert response.status_code == 500
    json_data = response.json()
    assert "error" in json_data
    assert json_data["error"]["code"] == "INTERNAL_SERVER_ERROR"
    assert json_data["error"]["message"] == "An internal server error occurred. Please try again later."
