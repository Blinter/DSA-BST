/**
 * Represents a node in a binary tree.
 */
// sonarlint-disable-next-line javascript:S2094
class Node {
  /**
   * Creates a new Node instance.
   * @param {*} val - The value stored in the node.
   * @param {Node} [left=null] - The left child node.
   * @param {Node} [right=null] - The right child node.
   */
  constructor(val, left = null, right = null) {
    /** @type {*} The value stored in the node. */
    this.val = val;
    /** @type {Node} The left child node. */
    this.left = left;
    /** @type {Node} The right child node. */
    this.right = right;
  }
}

/**
 * Represents a Binary Search Tree (BST) data structure.
 */
class BinarySearchTree {
  /**
   * Creates a new BinarySearchTree instance.
   * @param {Node} [root=null] - The root node of the tree.
   */
  constructor(root = null) {
    /** @type {Node} The root node of the tree. */
    this.root = root;
  }

  /**
   * Inserts a new node with the given value into the BST.
   * Uses iteration for insertion.
   * @param {*} val - The value to insert into the tree.
   * @returns {BinarySearchTree} This tree instance after insertion.
   */
  insert(val) {
    if (this.root === null) {
      this.root = new Node(val);
      return this;
    }

    let current = this.root;
    while (true) {
      if (val < current.val) {
        if (current.left === null) {
          current.left = new Node(val);
          return this;
        } else {
          current = current.left;
        }
      } else if (val > current.val) {
        if (current.right === null) {
          current.right = new Node(val);
          return this;
        } else {
          current = current.right;
        }
      }
    }
  }

  /**
   * Inserts a new node with the given value into the BST.
   * Uses recursion for insertion.
   * @param {*} val - The value to insert into the tree.
   * @param {Node} [current=this.root] - The current node being processed.
   * @returns {BinarySearchTree} This tree instance after insertion.
   */
  insertRecursively(val, current = this.root) {
    if (this.root === null) {
      this.root = new Node(val);
      return this;
    }

    if (val < current.val) {
      if (current.left === null) {
        current.left = new Node(val);
        return this;
      }
      return this.insertRecursively(val, current.left);
    } else {
      if (current.right === null) {
        current.right = new Node(val);
        return this;
      }
      return this.insertRecursively(val, current.right);
    }
  }

  /**
   * Searches for a node with the given value in the BST.
   * Uses iteration for searching.
   * @param {*} val - The value to search for in the tree.
   * @returns {Node|undefined} The found node if exists, otherwise undefined.
   */
  find(val) {
    let currentNode = this.root;
    let found = false;

    if (val === currentNode?.val) return currentNode;

    while (currentNode && !found) {
      if (val < currentNode.val) {
        currentNode = currentNode.left;
      } else if (val > currentNode.val) {
        currentNode = currentNode.right;
      } else {
        found = true;
      }
    }

    return found ? currentNode : undefined;
  }

  /**
   * Searches for a node with the given value in the BST.
   * Uses recursion for searching.
   * @param {*} val - The value to search for in the tree.
   * @param {Node} [current=this.root] - The current node being processed.
   * @returns {Node|undefined} The found node if exists, otherwise undefined.
   */
  findRecursively(val, current = this.root) {
    if (this.root === null) return undefined;

    if (val < current.val) {
      if (current.left === null) return undefined;
      return this.findRecursively(val, current.left);
    } else if (val > current.val) {
      if (current.right === null) return undefined;
      return this.findRecursively(val, current.right);
    }
    return current;
  }

  /**
   * Performs a pre-order depth-first traversal of the BST.
   * @returns {Array<*>} An array of visited node values.
   */
  dfsPreOrder() {
    const data = [];
    const traverse = (node) => {
      if (!node) return;
      data.push(node.val);
      traverse(node.left);
      traverse(node.right);
    };
    traverse(this.root);
    return data;
  }

  /**
   * Performs an in-order depth-first traversal of the BST.
   * @returns {Array<*>} An array of visited node values.
   */
  dfsInOrder() {
    const data = [];
    const traverse = (node) => {
      if (!node) return;
      traverse(node.left);
      data.push(node.val);
      traverse(node.right);
    };
    traverse(this.root);
    return data;
  }

  /**
   * Performs a post-order depth-first traversal of the BST.
   * @returns {Array<*>} An array of visited node values.
   */
  dfsPostOrder() {
    const data = [];
    const traverse = (node) => {
      if (!node) return;
      traverse(node.left);
      traverse(node.right);
      data.push(node.val);
    };
    traverse(this.root);
    return data;
  }

  /**
   * Performs a breadth-first traversal of the BST.
   * @returns {Array<*>} An array of visited node values.
   */
  bfs() {
    const data = [];
    const queue = [this.root];

    while (queue.length > 0) {
      const node = queue.shift();
      data.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    return data;
  }

  /**
   * Removes a node with the given value from the BST.
   * @param {*} val - The value of the node to remove.
   * @returns {Node} The removed node.
   */
  remove(val) {
    let nodeToRemove = this.root;
    let parent;

    while (nodeToRemove?.val !== val) {
      parent = nodeToRemove;
      if (val < nodeToRemove.val) {
        nodeToRemove = nodeToRemove.left;
      } else {
        nodeToRemove = nodeToRemove.right;
      }
    }

    if (!nodeToRemove) return null;

    if (nodeToRemove === this.root) {
      // Handle root removal separately
      const tempRoot = new Node(null);
      tempRoot.left = this.root;
      parent = tempRoot;
      nodeToRemove = this.root;
    }

    if (nodeToRemove.left === null && nodeToRemove.right === null) {
      // No children
      if (parent.left === nodeToRemove) {
        parent.left = null;
      } else {
        parent.right = null;
      }
    } else if (nodeToRemove.left !== null && nodeToRemove.right !== null) {
      // Two children
      let rightParent = nodeToRemove;
      let right = nodeToRemove.right;
      if (right.left === null) {
        right.left = nodeToRemove.left;
        if (parent.left === nodeToRemove) {
          parent.left = right;
        } else {
          parent.right = right;
        }
      } else {
        while (right.left !== null) {
          rightParent = right;
          right = right.left;
        }
        if (parent.left === nodeToRemove) {
          parent.left.val = right.val;
        } else {
          parent.right.val = right.val;
        }
        if (right.right !== null) {
          rightParent.left = right.right;
        } else {
          rightParent.left = null;
        }
      }
    } else {
      // One child
      if (parent.left === nodeToRemove) {
        parent.left = nodeToRemove.left || nodeToRemove.right;
      } else {
        parent.right = nodeToRemove.left || nodeToRemove.right;
      }
    }

    if (this.root === nodeToRemove) {
      this.root = parent.left;
    }

    return nodeToRemove;
  }

  /**
   * Checks if the BST is balanced.
   * @param {Node} [current=this.root] - The current node being processed.
   * @returns {boolean} True if the tree is balanced, false otherwise.
   */
  isBalanced(current = this.root) {
    if (current === null) return true;

    const minDepth = (node) => {
      if (node === null) return 0;
      return 1 + Math.min(minDepth(node.left), minDepth(node.right));
    };

    const maxDepth = (node) => {
      if (node === null) return 0;
      return 1 + Math.max(maxDepth(node.left), maxDepth(node.right));
    };

    return maxDepth(current) - minDepth(current) <= 1;
  }

  /**
   * Finds the second highest value in the BST.
   * @param {Node} [current=this.root] - The current node being processed.
   * @returns {*|undefined} The second highest value if exists, otherwise undefined.
   */
  findSecondHighest(current = this.root) {
    if (!this.root || (!this.root.left && !this.root.right)) return undefined;

    while (current) {
      if (current.left && !current.right) {
        return this.findSecondHighest(current.left);
      }
      if (current.right && (!current.right.left && !current.right.right)) {
        return current.val;
      }
      current = current.right;
    }
  }

  /**
   * Performs an iterative in-order depth-first traversal of the BST.
   * @returns {Array<*>} An array of visited node values.
   */
  dfsInOrderIterative() {
    const dfs = [];
    const stack = [];
    let cur = this.root;

    while (stack.length > 0 || cur) {
      while (cur) {
        stack.push(cur);
        cur = cur.left;
      }
      cur = stack.pop();
      if (cur) {
        dfs.push(cur.val);
        cur = cur.right;
      }
    }

    return dfs;
  }
}

module.exports = BinarySearchTree;