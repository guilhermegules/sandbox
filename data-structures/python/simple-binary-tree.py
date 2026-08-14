class TreeNode:
    def __init__(self, value, left=None, right=None):
        self.value = value
        self.left = left
        self.right = right

root = TreeNode(1)
root.left = TreeNode(2)
root.right = TreeNode(3)
root.right.left = TreeNode(4)
root.right.right = TreeNode(5)

# Flat the tree and traversal, useful to get the data in order, useful in BST
def in_order(node):
    if not node:
        return
    in_order(node.left)
    print(node.value, end=" ")
    in_order(node.right)

in_order(root)

print("\n")

# Useful to recreate a tree, show the hierarchy
def pre_order(node):
    if not node:
        return
    print(node.value, end=" ")
    pre_order(node.left)
    pre_order(node.right)

pre_order(root)

print("\n")

# Useful to the bottom up logic and for cleaning the tree
def post_order(node):
    if not node:
        return
    post_order(node.left)
    post_order(node.right)
    print(node.value, end=" ")

post_order(root)