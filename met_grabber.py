import requests

met = requests.get('https://collectionapi.metmuseum.org/public/collection/v1/objects', params='objectIDs').json()

object_list = [k for k in met.values()]

for art_object in object_list[1]:

    url = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/' + str(art_object)

    obj_request = requests.get(url)

    obj_request = obj_request.json()

    print("Object ID: " + str(obj_request['objectID']))
    print("Artist Name: " + obj_request['artistDisplayName'])
    print("Title: " + obj_request['title'])
    print("Image: " + obj_request['primaryImage'])
    print("\n--------------------\n")




