import json
from postman import Collection

def convert_postman_to_pytest(postman_json_path, output_path):
    with open(postman_json_path, 'r') as file:
        postman_collection = json.load(file)
    
    collection = Collection(postman_collection)
    output_lines = ["import pytest", "import requests", "\n"]

    for item in collection.items:
        request = item.request
        method = request.method.lower()
        url = request.url.raw
        headers = {header.key: header.value for header in request.headers}
        body = request.body.raw if request.body else ''

        test_name = f"test_{item.name.replace(' ', '_').lower()}"
        output_lines.append(f"def {test_name}():")
        
        if method == 'get':
            code = f"    response = requests.get('{url}', headers={headers})"
        elif method == 'post':
            code = f"    response = requests.post('{url}', headers={headers}, data={body})"
        elif method == 'put':
            code = f"    response = requests.put('{url}', headers={headers}, data={body})"
        elif method == 'delete':
            code = f"    response = requests.delete('{url}', headers={headers})"
        else:
            code = f"    # Unsupported method {method}"

        output_lines.append(code)
        output_lines.append("    assert response.status_code == 200")
        output_lines.append("    print(response.json())\n")

    with open(output_path, 'w') as file:
        file.write("\n".join(output_lines))

# Example usage
convert_postman_to_pytest('postman_collection.json', 'test_postman_requests.py')
