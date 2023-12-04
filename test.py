import requests

baseUrl = "http://13.58.91.188:5000/api/hello"
baseUrl2 = "http://13.58.91.188:5000/api/hello_post"

response = requests.get(baseUrl)
response2 = requests.post(baseUrl2)

print(response.text)
print(response2.text)