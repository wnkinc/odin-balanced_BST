class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  buildTree(array) {
    // Sort the array and remove duplicates
    array = [...new Set(array)].sort((a, b) => a - b);

    // Helper function to recursively build the binary search tree
    const build = (arr, start, end) => {
      if (start > end) {
        return null;
      }

      const mid = Math.floor((start + end) / 2);
      const node = new Node(arr[mid]);

      node.left = build(arr, start, mid - 1);
      node.right = build(arr, mid + 1, end);

      return node;
    };

    return build(array, 0, array.length - 1);
  }

  insert(value) {
    const newNode = new Node(value);

    // Helper function to recursively find the correct place for the new node
    const insertNode = (node, newNode) => {
      if (newNode.value < node.value) {
        // Insert into the left subtree
        if (node.left === null) {
          node.left = newNode;
        } else {
          insertNode(node.left, newNode);
        }
      } else if (newNode.value > node.value) {
        // Insert into the right subtree
        if (node.right === null) {
          node.right = newNode;
        } else {
          insertNode(node.right, newNode);
        }
      }
      // If the value is equal, do nothing (to avoid duplicates)
    };

    if (this.root === null) {
      this.root = newNode; // Tree is empty, set root
      return false;
    } else {
      insertNode(this.root, newNode); // Recursively insert into tree
      return true;
    }
  }

  deleteItem(value) {
    const getSuccessor = (current) => {
      current = current.right; // Move to the right subtree
      while (current !== null && current.left !== null) {
        current = current.left; // Find the leftmost node in the right subtree
      }
      return current; // Return the successor node
    };

    const deleteNode = (node, value) => {
      // Base case
      if (node === null) {
        return node;
      }

      // If value to be searched is in a subtree
      if (node.value > value) {
        node.left = deleteNode(node.left, value);
      } else if (node.value < value) {
        node.right = deleteNode(node.right, value);
      } else {
        // If node matches with the given value

        // Cases when node has 0 children or
        // only right child
        if (node.left === null) return node.right;

        // When root has only left child
        if (node.right === null) return node.left;

        // When both children are present
        let successor = getSuccessor(node);
        node.value = successor.value;
        node.right = deleteNode(node.right, successor.value);
      }
      return node;
    };

    if (this.root === null) {
      return false; // Tree is empty
    } else {
      this.root = deleteNode(this.root, value);
      return true;
    }
  }

  find(value) {
    const findNode = (node, value) => {
      if (node === null) {
        return null; // Value not found
      }
      if (value === node.value) {
        return node; // Value found
      } else if (value < node.value) {
        return findNode(node.left, value); // Search in the left subtree
      } else {
        return findNode(node.right, value); // Search in the right subtree
      }
    };

    return findNode(this.root, value); // Return true if value is found, otherwise false
  }

  levelOrder(callback) {
    if (typeof callback !== "function") {
      throw new Error("A callback function is required.");
    }

    if (this.root === null) {
      return; // Tree is empty, nothing to traverse
    }

    const queue = [this.root];

    while (queue.length > 0) {
      const node = queue.shift(); // Get the first node in the queue
      callback(node); // Apply the callback to the current node

      // Add the children to the queue
      if (node.left !== null) {
        queue.push(node.left);
      }
      if (node.right !== null) {
        queue.push(node.right);
      }
    }
  }

  inOrder(callback) {
    if (typeof callback !== "function") {
      throw new Error("A callback function is required.");
    }

    const traverseInOrder = (node) => {
      if (node === null) {
        return;
      }

      traverseInOrder(node.left); // Traverse left subtree
      callback(node); // Apply callback to the current node
      traverseInOrder(node.right); // Traverse right subtree
    };

    traverseInOrder(this.root); // Start traversal from the root
  }

  preOrder(callback) {
    if (typeof callback !== "function") {
      throw new Error("A callback function is required.");
    }

    const traversePreOrder = (node) => {
      if (node === null) {
        return;
      }

      callback(node); // Apply callback to the current node
      traversePreOrder(node.left); // Traverse left subtree
      traversePreOrder(node.right); // Traverse right subtree
    };

    traversePreOrder(this.root); // Start traversal from the root
  }

  postOrder(callback) {
    if (typeof callback !== "function") {
      throw new Error("A callback function is required.");
    }

    const traversePostOrder = (node) => {
      if (node === null) {
        return;
      }

      traversePostOrder(node.left); // Traverse left subtree
      traversePostOrder(node.right); // Traverse right subtree
      callback(node); // Apply callback to the current node
    };

    traversePostOrder(this.root); // Start traversal from the root
  }

  height(node) {
    if (node === null) {
      return -1; // Conventionally, height of an empty tree is -1
    }

    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(node) {
    if (node === null) {
      return -1; // If the node is null, we return -1. Depth is defined for existing nodes only.
    }

    const findDepth = (current, target, currentDepth) => {
      if (current === null) {
        return -1; // Target not found in this subtree
      }
      if (current === target) {
        return currentDepth; // Target found, return the depth
      }

      // Recursively search in the left and right subtrees
      const leftDepth = findDepth(current.left, target, currentDepth + 1);
      if (leftDepth !== -1) {
        return leftDepth; // If found in the left subtree
      }

      return findDepth(current.right, target, currentDepth + 1); // Search in the right subtree
    };

    return findDepth(this.root, node, 0); // Start searching from the root
  }

  isBalanced() {
    const checkBalance = (node) => {
      if (node === null) {
        return { isBalanced: true, height: -1 };
      }

      // Check left subtree
      const left = checkBalance(node.left);
      if (!left.isBalanced) {
        return { isBalanced: false, height: 0 };
      }

      // Check right subtree
      const right = checkBalance(node.right);
      if (!right.isBalanced) {
        return { isBalanced: false, height: 0 };
      }

      // Determine if the current node is balanced
      const isCurrentNodeBalanced = Math.abs(left.height - right.height) <= 1;
      const height = Math.max(left.height, right.height) + 1;

      return { isBalanced: isCurrentNodeBalanced, height: height };
    };

    return checkBalance(this.root).isBalanced;
  }

  // Function to collect nodes in sorted order using in-order traversal
  inOrderTraversal(node, nodes) {
    if (node === null) {
      return;
    }

    this.inOrderTraversal(node.left, nodes);
    nodes.push(node.value);
    this.inOrderTraversal(node.right, nodes);
  }

  // Function to rebalance the tree
  rebalance() {
    if (this.root === null) {
      return;
    }

    const nodes = [];
    this.inOrderTraversal(this.root, nodes);

    this.root = this.buildTree(nodes);
  }
}

export default Tree;
