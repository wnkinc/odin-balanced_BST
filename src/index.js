import "normalize.css"; // Importing normalize.css from node_modules
import "./styles.css";

import Tree from "./balanced_BST";

// Example usage:

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

// Helper function to generate an array of random numbers
const generateRandomArray = (size, max) => {
  const arr = [];
  for (let i = 0; i < size; i++) {
    arr.push(Math.floor(Math.random() * max));
  }
  return arr;
};

// Create a binary search tree from an array of random numbers
const randomNumbers = generateRandomArray(10, 100);
const tree = new Tree(randomNumbers);

// Check if the tree is balanced
console.log(
  "Initial tree balance status:",
  tree.isBalanced() ? "Balanced" : "Unbalanced",
);

// Print all elements in different orders
const printTreeTraversals = (tree) => {
  console.log("Level Order:");
  tree.levelOrder((node) => console.log(node.value));

  console.log("Pre Order:");
  tree.preOrder((node) => console.log(node.value));

  console.log("Post Order:");
  tree.postOrder((node) => console.log(node.value));

  console.log("In Order:");
  tree.inOrder((node) => console.log(node.value));
};

printTreeTraversals(tree);

// Unbalance the tree by adding several numbers > 100
const unbalanceNumbers = [150, 200, 250, 300];
unbalanceNumbers.forEach((num) => tree.insert(num));

// Check if the tree is unbalanced
console.log(
  "Tree balance status after adding large numbers:",
  tree.isBalanced() ? "Balanced" : "Unbalanced",
);

// Rebalance the tree
tree.rebalance();

// Check if the tree is balanced again
console.log(
  "Tree balance status after rebalancing:",
  tree.isBalanced() ? "Balanced" : "Unbalanced",
);

// Print all elements in different orders after rebalancing
printTreeTraversals(tree);
