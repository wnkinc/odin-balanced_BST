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

  insert(value) {}

  deleteItem(value) {}
}

export default Tree;
