/**
 * Here are iterative solutions for preorder, inorder, and postorder DFS.
 *
 * Definition for a binary tree node.
 * function Node(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 *
 * @param {Node} root
 * @return {Array} an array of node values.
 */
function preorderDFS(root) {
  let stack = [],
    res = [];

  while (true) {
    if (root !== null) {
      stack.push(root);
      res.push(root.val);
      root = root.left;
    } else {
      if (stack.length === 0) break;
      root = stack.pop();
      root = root.right;
    }
  }

  return res;
}

function inorderDFS(root) {
  let stack = [],
    res = [];

  while (true) {
    if (root !== null) {
      stack.push(root);
      root = root.left;
    } else {
      if (stack.length === 0) break;
      root = stack.pop();
      res.push(root.val);
      root = root.right;
    }
  }

  return res;
}

function postorderDFS(root) {
  let stack = [],
    res = [];

  while (true) {
    if (root !== null) {
      stack.push(root);
      root = root.left;
    } else {
      if (stack.length === 0) break;
      root = stack.pop();
      if (root.right !== null && root.right.visited !== true) {
        stack.push(root);
        root = root.right;
      } else {
        if (root.visited === undefined) {
          res.push(root.val);
          root.visited = true;
        }
        root = root.right;
      }
    }
  }

  return res;
}
