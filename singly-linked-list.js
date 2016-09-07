/**
 * The operations that can be performed on a singly-linked list include:
 * 1. pushFront(key) takes O(1) time.
 * 2. topFront() takes O(1) time.
 * 3. popFront() takes O(1) time.
 * 4. pushBack(key) takes O(1) time with a tail pointer, otherwise O(n).
 * 5. topBack() takes O(1) time with a tail pointer, otherwise O(n).
 * 6. popBack() takes O(n) time because we need to update the node before it which we don't have a reference to.
 * 7. find(key) takes O(n) time because we need to move through the array left-to-right until we find the node.
 * 8. erase(key) takes O(n) time because it involves searching for the node that points to the given key so that we
 *    can update it to skip the key.
 * 9. empty() takes O(1) time because we simply check if the head pointer is set to null.
 * 10. addBefore(nodeKey, newKey) takes O(n) time. The list must be transversed until we find the node pointing to the
 *     nodeKey. Then we can update the node we found to point to the newly created node.
 * 11. addAfter(nodeKey, newKey) takes O(1) time assuming we know the position of the nodeKey, otherwise searching for 
 *     the nodeKey takes O(n) time by itself.
 */
class Node {
  constructor(key) {
    this.key = key;
    this.next = null;
  }
}
class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  pushFront(key) {
    let node = new Node(key);
    node.next = this.head;
    this.head = node;
    this.tail === null ? this.tail = this.head : '';
  }

  topFront() {
    return this.head;
  }

  popFront() {
    if (this.head === null) {
      throw "empty list";
    }
    this.head = this.head.next;
  }

  pushBack(key) {
    let node = new Node(key);
    node.next = null;
    if (this.tail === null) {
      this.head = node;
    } else {
      this.tail.next = node;
    }
    this.tail = node;
  }

  topBack() {
    if (this.tail === null) {
      throw "empty list";
    }
    return this.tail;
  }

  // Runs in O(n) time because we need to modify the "next" pointer
  // of the previous node which is not directly accessible.
  popBack() {
    if (this.tail === null) {
      throw "empty list";
    }
    if (this.head === this.tail) { // there is just one node
      this.head = null;
      this.tail = null;
    } else {
      let n = this.head;
      while (n.next.next !== null) {
        n = n.next;
      }
      n.next = null;
      this.tail = n;
    }
  }

  find(key) {
    let n = this.head;
    do {
      if (n.key === key) {
        return n;
      }
      n = n.next;
    } while (n !== null);
    return -1;
  }

  erase(key) {
    if (this.head.key === key) {
      this.head = this.head.next;
    } else {
      let n = this.head;
      while (n.next !== null) {
        if (n.next.key === key) {
          n.next = n.next.next;
        } else {
          n = n.next;
        }
      }
    }
  }

  isEmpty() {
    return this.head === null;
  }

  addBefore(nodeKey, newKey) {
    let newNode = new Node(newKey);
    let n = this.head;
    do {
      if (n.next.key === nodeKey) {
        newNode.next = n.next;
        n.next = newNode;
        return;
      }
      n = n.next;
    } while (n.next !== null);
    return -1;
  }

  addAfter(nodeKey, newKey) {
    let n = this.find(nodeKey);
    if (n !== -1) {
      let newNode = new Node(newKey);
      newNode.next = n.next;
      n.next = newNode;
      return;
    }
    return -1;
  }
}
