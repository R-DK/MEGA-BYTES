class PriorityScheduling:

    def __init__(self, orderList: list):
        """Give a list of dictionaries where dictionaries contains the order information
           with the priority"""
        self.orders = []
        if orderList != []:
            self.orders = orderList

    def max_heapify(self, node, n):
        """max heapifies the given node"""
        leftChild = 2*node + 1
        rightChild = 2*node + 2
        
        largest = node
        if(leftChild<n and self.orders[node]["priority"] > self.orders[leftChild]["priority"]):
            largest = leftChild
        if(rightChild<n and self.orders[node]["priority"] > self.orders[rightChild]["priority"]):
            largest = rightChild 
        
        if largest!=node:
            self.orders[node], self.orders[largest] = self.orders[largest], self.orders[node]
            self.max_heapify(largest, n)

    def build_max_heap(self):
        """used to build a max heap with the given list of orders based on the priority"""
        n = len(self.orders)
        for node in range(n//2, -1, -1):
            self.max_heapify(node, n)
    
    def prioritze(self) -> list:
        """returns a list of orders based on the priority."""
        self.build_max_heap()
        length = len(self.orders)
        for node in range(length-1, -1, -1):
            self.orders[0], self.orders[node] = self.orders[node], self.orders[0]
            self.max_heapify(0, length)
        return self.orders


orders = [
    {
        "OrderId" : 1,
        "Customer Name": "Nithesh",
        "Residential Address" : "197/223, Periya Suraikaipatti st, Rajapalayam",
        "Number of items" : 4,
        "priority" : 1
    },
    {
        "OrderId" : 2,
        "Customer Name": "Kanna",
        "Residential Address" : "197/224, Periya Suraikaipatti st, Rajapalayam",
        "Number of items" : 3,
        "priority" : 5
    },
    {
        "OrderId" : 3,
        "Customer Name": "Maadhav",
        "Residential Address" : "101-B, tambaram. Chenai",
        "Number of items" : 4,
        "priority" : 3
    }
]

priority = PriorityScheduling(orders)
priority.prioritze()
for order in priority.orders:
    print(order)