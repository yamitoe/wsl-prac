class Node:
    def __init__(self, parent, location):
        self.parent = parent
        self.location = location
        # For herustic function f = g + h 
        # where g is distance current node to start
        # where h is the estimate distance (herustic) to goal
        # Each node should calculate its own herustic function f
        self.g = 0
        self.h = 0
        self.f = 0
    def __eq__(self, cityNode):
        # Compare city names, if they are the same its the same node
        return self.location == cityNode.location

    def addHerusticData(self,g,h):
        self.g = g
        self.h = h
        self.f = self.g + self.h
    



def createNode(city1,city2):
    return Node(city1, city2)
def createMaze():
    createNode("Abbotsford","Chilliwack")




def pathFinder(city1,city2):
    cities = ["Chilliwack","Mission","Kent","Hope","Abbotsford"]
    cities1 = [
        {"city": "Abbotsford", "TO":"Chilliwack", "g":32.7, "h":.42},
        {"city": "Abbotsford", "TO":"Mission", "g":16.8, "h":.12},
        {"city": "Abbotsford", "TO":"Kent", "g":58.3, "h":.75},
        {"city": "Abbotsford", "TO":"Hope", "g":87.1, "h":1.2},
 
        {"city": "Chilliwack", "TO":"Mission", "g":40.5, "h":.29},
        {"city": "Chilliwack", "TO":"Kent", "g":28, "h":.32},
        {"city": "Chilliwack", "TO":"Hope", "g":86.8, "h":.79},

        {"city": "Mission", "TO":"Kent", "g":49.4, "h":.62},
        {"city": "Mission", "TO":"Hope", "g":81.9, "h":1.08},

        {"city": "Kent", "TO":"Hope", "g":33.5, "h":.46}

    ]
    if city1 not in cities:
        print("Please choose from the following cities: Chilliwack, Mission, Kent or Hope")
    else:
        print(city1,city2)

    # starting node
    start = Node(None, city1)
    goal = Node(None, city2)

    # The lists, one for current paths, one for travesied paths to prevent infinity loop possibilty
    possiblePaths = []
    previousPaths = []
    #Add the start to the list
    possiblePaths.append(start)   
    # Loop intill you reach the goal  #If list is not empty continue
    while len(possiblePaths) > 0:
        # Index so we can pop it outta list
        currentNode = possiblePaths[0]
        currentIndex = 0

        # Compare nodes f function, pick smallest, set as currentNode
        for index, val in enumerate(possiblePaths):
            if val.f < currentNode.f:
                currentNode = val
                currentIndex = index
        # Remove the smallest route from list, so we can add its neighbouring nodes after
        possiblePaths.pop(currentIndex)
        print("Path removed was: " + currentNode.location)
        previousPaths.append(currentNode)


        # Copy possible cities 
        routes = cities.copy()
 
        # remove current city from possible cities
        routes.remove(currentNode.location)
        previousPaths.append(currentNode)

        # Add Neighbour Nodes to List
        # Builds the path, create children nodes
        # This here creates the possible routes for each node
        
        for city in routes:
            counter = len(possiblePaths)
            while counter >= 0:
                # Filters dupliactes, will only add new routes
                
                if (Node(None,city) not in possiblePaths ) and Node(None,city) not in previousPaths:
                    nodeToAdd = Node(Node(None,currentNode.location),city)
                    for data in cities1:   
                        # Add data to nodes
                        if (city == data["city"]  and currentNode.location == data["TO"]) or (currentNode.location == data["city"] and city == data["TO"]):
                            nodeToAdd.addHerusticData(data["g"],data["h"])
                            print("Called")
                    possiblePaths.append(nodeToAdd)
                counter = counter - 1
    
               
        
 

        # possiblePaths = [*possiblePaths, *routes]
 
        for x in possiblePaths:
            print(x.__dict__ )   
        print("newloop")




        # If goal is found
        if currentNode == goal:
            path = []
            current = currentNode
            # print(current.__dict__ )   
            # print("data was")
            # Make an array of the path from goal to start, return back array of strings
            while current is not None:
                # print(current.parent)
                path.append(current.location)
                current = current.parent
            print("Path was called")
            print(path)
            return path.reverse()






pathFinder("Chilliwack","Mission")
# pathFinder("Chilli","Mission")
