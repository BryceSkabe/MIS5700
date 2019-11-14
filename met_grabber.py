import requests
import pyodbc

# add desired queries to this list
queries = ['pottery']

sql_query = (
        "INSERT INTO mis5700 (`id`, `artist`, `title`, `image`, `classification`, `date`, `medium`, `department`, `query`) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)")

for query in queries:

    met = requests.get('https://collectionapi.metmuseum.org/public/collection/v1/search', params='q=' + query).json()

    object_list = [k for k in met.values()]

    for art_object in object_list[1]:
        url = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/' + str(art_object)

        print(url)

        obj_request = requests.get(url).json()

        # check to make sure item has all necessary parts to build web card, skip if it doesn't
        if len(str(obj_request['objectID'])) > 0 \
                and len(obj_request['artistDisplayName']) > 0 \
                and len(obj_request['title']) > 0 \
                and len(obj_request['primaryImage']) > 0 \
                and obj_request['isPublicDomain']\
                and len(obj_request['objectDate']) > 0\
                and len(obj_request['medium']) > 0\
                and len(obj_request['department']) > 0:

            print("Object ID: " + str(obj_request['objectID']))
            print("Artist Name: " + obj_request['artistDisplayName'])
            print("Title: " + obj_request['title'])
            print("Image: " + obj_request['primaryImage'])
            print("Classification: " + obj_request['classification'])
            print("Object Date: " + obj_request['objectDate'])
            print("Object Medium: " + obj_request['medium'])
            print("Department: " + obj_request['department'])
            print(query)
            print("\n--------------------\n")

            # conn = pyodbc.connect('Driver={SQL Server};'
            #                       'Server=server_name;'
            #                       'Database=db_name;'
            #                       'Trusted_Connection=yes;')
            #
            # cursor = conn.cursor()
            # values = obj_request['objectID'], obj_request['artistDisplayName'], obj_request['title'], obj_request['primaryImage'], obj_request['classification'], obj_request['objectDate'], obj_request['medium'], obj_request['department'], query
            # cursor.execute(query, values)
            # cursor.close()
            # conn.commit()
            # conn.close()

        else:
            continue







