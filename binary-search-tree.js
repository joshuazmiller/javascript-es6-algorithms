/**
 * A binary search tree is a data structure used to insert, remove, and find nodes using an ordered tree where elements
 * to the left of a node are smaller and elements to the right of a node are larger. This structure has the potential
 * to make certain search operations a lot faster than implementations with sorted arrays, hash tables, or linked-lists.
 * Such operations include a rangeSearch(x,y) and nearestNeighbors(z) search. A rangeSearch finds existing nodes with
 * keys between numbers x and y. A nearestNeighbors search finds the immediate existing nodes with keys on either side
 * of number z. A hashtable does not support such search operations, a sorted array is expensive to maintain, and a
 * standard linked-list is expensive to search because even if it would be sorted there's no way to recursively jump
 * to the middle of the list. A binary search tree solves this problem using a tree structure where each node specifies
 * its parent and its children. The children are inserted with nodes greater to its right and nodes smaller to its left.
 * A binary-search-tree does not need to be balanced per-se which can lead to inefficiencies of O(n) with a very
 * unbalanced tree. AVL trees, and other variations of the binary search tree, address this problem by keeping the tree
 * balanced. The following is an implementation of a binary search tree:
 */
class Node {
  constructor(key, parent, left = null, right = null) {
    this.key = key;
    this.parent = parent;
    this.left = left;
    this.right = right;
  }
}
class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  /**
   * A helper function for the nextLargest(node) function. In nextLargest() we move right and then search the right node for its
   * leftmost descendant recursively until we can't go left anymore. This will be the input node's nextLargest largest value.
   *
   * @param node Originally this is the input node's right-child.
   * @returns {*} When it hits a null left pointer then we know we've gone as far left as possible. Otherwise, we keep
   * going left.
   * @private
   */
  _leftDescendant(node) {
    if (node.left === null) {
      return node;
    } else {
      return this._leftDescendant(node.left);
    }
  }

  /**
   * A helper function for the nextLargest(node) function. In nextLargest() if there is no right-child then we must move upwards in
   * the tree to search for a right-ancestor. Any right-ancestor will by definition be greater than the input node.
   *
   * @param node Originally this is the input node.
   * @returns {*} When we hit a right-ancestor then we've found the nextLargest greatest element, otherwise we keep searching
   * upwards in the tree. If we can't find any larger node (the input node is actually the largest in the tree) then we
   * return null.
   * @private
   */
  _rightAncestor(node) {
    if (node.parent === null) {
      return null;
    } else if (node.key < node.parent.key) {
      return node.parent;
    } else {
      return this._rightAncestor(node.parent);
    }
  }

  /**
   * Would like to find the nextLargest largest element.
   *
   * @param {Node} node The starting node.
   * @returns {Node} The node with the nextLargest largest key. Returns null if there are no larger nodes.
   * @public
   *
   * a) If the input node has a right child then we move to the right which is larger than the input node, and then we
   * keep searching left to find the smallest node greater than the input node.
   * b) If the input node has no right child then all its children will be smaller than it. Therefore, we must transverse
   * upwards and check its parent. If the parent is larger then return that, otherwise we must check the grandparent, etc.
   */
  nextLargest(node) {
    if (node.right !== null) {
      return this._leftDescendant(node.right);
    } else {
      return this._rightAncestor(node);
    }
  }

  /**
   * @param {Number} key The key to search for.
   * @param {Node} root The root of the subtree to search (defaults to the root of the tree).
   * @returns {Node} Either the node with the given key, or if the key doesn't exist then we return the node the key
   * should be a child of.
   * @public
   */
  find(key, root = this.root) {
    if (root.key === key) {
      return root;
    } else if (root.key > key) {
      if (root.left !== null) {
        return this.find(key, root.left);
      }
      return root;
    } else if (root.key < key) {
      if (root.right !== null) {
        return this.find(key, root.right);
      }
      return root;
    }
  }

  /**
   * In a range search we want to find nodes with keys between two numbers. To do this, we perform find() operations.
   * Our find() function returns the node with key x or else the next largest node. We then evaluate whether it is smaller
   * than y and if so we add it to the list. We then make use of our nextLargest function to get the next largest node
   * and we perform a check to see if its less than y and if so we add it to the list, etc.
   *
   * @param {Number} x The left bound.
   * @param {Number} y The right bound.
   * @param {Node} root The root of the tree or subtree. Default is the root of the tree.
   * @returns {Array} A list of nodes with keys between x and y.
   * @public
   */
  rangeSearch(x, y, root = this.root) {
    const list = [];
    let node = this.find(x, root);
    while (node && node.key <= y) {
      if (node.key >= x) {
        list.push(node);
      }
      node = this.nextLargest(node);
    }
    return list;
  }

  /**
   * Adds a node with the given key to the tree. We can use our find() function to return the appropriate parent of the
   * new node and then insert our new node in its correct spot.
   * @param {Number} key The key to be inserted.
   * @public
   */
  insert(key) {
    if (this.root === null) {
      this.root = new Node(key, null);
      return;
    }
    const parent = this.find(key);
    const node = new Node(key, parent);
    if (key > parent.key) {
      parent.right = node;
    } else {
      parent.left = node;
    }
  }

  /**
   * To remove a node we must replace the removed node with its next largest node; otherwise we might leave a gap in the
   * tree where the removed node's children have no parent. To do this we use our nextLargest function to find the next
   * largest node and replace the removed node with that node. The node found by nextLargest by definition will not
   * have a left-child (because if it did then we'd keep moving left); its right-child, if any, will be promoted to
   * replace it as the left-child of its parent.
   *
   * @param {Number} key The node to remove.
   * @public
   */
  remove(key) {
    const nodeToRemove = this.find(key);
    if (nodeToRemove.right === null) {
      // We promote the left child.
      if (nodeToRemove.left) {
        nodeToRemove.left.parent = nodeToRemove.parent;
      }
      // We choose which side of the parent to place the promoted left child.
      if (key < nodeToRemove.parent.key) {
        nodeToRemove.parent.left = nodeToRemove.left;
      } else {
        nodeToRemove.parent.right = nodeToRemove.left;
      }
    } else {
      const nextLargest = this.nextLargest(nodeToRemove);
      const rightChild = nextLargest.right;
      const nextLargestParent = nextLargest.parent;

      // Replace the node being removed.
      nextLargest.left = nodeToRemove.left;
      nextLargest.left ? nextLargest.left.parent = nextLargest : '';
      if (nextLargest !== nodeToRemove.right) { // prevent assigning the right to itself
        nextLargest.right = nodeToRemove.right;
        nextLargest.right ? nextLargest.right.parent = nextLargest : '';
      }
      nextLargest.parent = nodeToRemove.parent;
      if (nextLargest.parent) {
        if (nextLargest.key < nextLargest.parent.key) {
          nextLargest.parent.left = nextLargest;
        } else {
          nextLargest.parent.right = nextLargest;
        }
      } else {
        this.root = nextLargest;
      }

      // Promote the right child. (The left child will be null because the next largest integer function only stops when the left is null.)
      if (rightChild) {
        rightChild.parent = nextLargestParent;
        if (rightChild.key < rightChild.parent.key) {
          rightChild.parent.left = rightChild;
        } else {
          rightChild.parent.right = rightChild;
        }
      } else {
        nextLargestParent.left = null;
      }
    }
    nodeToRemove.parent = null;
    nodeToRemove.left = null;
    nodeToRemove.right = null;
  }
}
