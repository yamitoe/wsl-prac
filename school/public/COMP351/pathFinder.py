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

    def addHerusticData(self,g,h,f):
        self.g = g
        self.h = f
        self.f = self.g + self.h
    






def pathFinder(city1,city2):
    cities1 = [{"city": "Chilliwack"},{"city": "Mission"},{"city": "Kent"},{"city": "Hope"}]
    cities = ["Chilliwack","Mission","Kent","Hope"]
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
        previousPaths.append(currentNode)


        # Copy possible cities 
        routes = cities1.copy()
 
        # remove current city from possible cities
        routes.pop(currentIndex)

        # Add Neighbour Nodes to List
        # Builds the path, create children nodes
        # This here creates the possible routes for each node
        
        for city in routes:
            counter = len(possiblePaths)
            while counter >= 0:
                # Filters dupliactes, will only add new routes
                if Node(None,city["city"]) not in possiblePaths:
                    nodeToAdd = Node(Node(None,currentNode.location),city["city"])
                    # nodeToAdd.addHerusticData()
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
