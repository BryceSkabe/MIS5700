import requests

# add desired queries to this list
queries = ['pottery']

for query in queries:

    met = requests.get('https://collectionapi.metmuseum.org/public/collection/v1/search', params='q=' + query).json()

    object_list = [k for k in met.values()]

    for art_object in object_list[1]:
        url = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/' + str(art_object)

        print(url)

        obj_request = requests.get(url).json()

        # check to make sure item has all necessary parts to build web card, skip if it doesn't
        if len(str(obj_request['objectID'])) > 0 and len(obj_request['artistDisplayName']) > 0 and \
                len(obj_request['title']) > 0 and len(obj_request['primaryImage']) > 0:

            print("Object ID: " + str(obj_request['objectID']))
            print("Artist Name: " + obj_request['artistDisplayName'])
            print("Title: " + obj_request['title'])
            print("Image: " + obj_request['primaryImage'])
            print(query)
            print("\n--------------------\n")

        else:
            continue







