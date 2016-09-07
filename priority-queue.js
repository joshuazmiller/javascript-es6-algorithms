/**
 * A priority queue is a type of queue where each element is assigned a priority and elements are retrieved highest
 * priority first. Priority queues require that an element with the highest priority be able to be retrieved in linear
 * time, that an element can be added and removed efficiently, and that an element's priority can be readily modified.
 * The challenge with a priority queue is that the rudimentary data structures such as an array, linked-list, standard
 * queue, or stack perform sub-optimally and therefore do not meet this criteria. Arrays have an inefficient time
 * retrieving a maximum value or alternatively keeping the array sorted. Linked-lists have difficulty inserting elements
 * according to their priorities at the appropriate positions without scanning the entire structure. Standard queues and
 * stacks rely on arrays or linked-lists as underlying types so are no better.
 *
 * The solution is using a data structure called a binary heap. A binary heap is a type of binary tree with the added
 * restriction that each level be full from left-to-right before creating another level. This leads to O(log n) in
 * regards to the growth of the tree's height. A priority queue has a max-heap property requirement in which each parent
 * node is greater-or-equal to each one of its children. The underlying data structure that a binary heap rests on is an
 * array with the added property of being entirely predictable as to the indexes of each elements' parent and children.
 * A parent can always be located at the floor(index/2). The children can be found at 2*index and 2*index + 1. These
 * properties make it easy and efficient to bubble up and bubble down elements that are in incorrect positions by
 * comparing the element with the value of its children or parent. As such, in a priority queue, the max element can be
 * pulled off the top and replaced by the last element of the structure which can then be sifted downwards into its
 * correct spot. The downwards sift only takes O(log n) time. Similarly, a new element can be appended to the tree and
 * then sifted up into its appropriate spot in O(log n) time. The priority of an element can also be modified and then
 * sifted into its correct spot as well in O(log n) time. Furthermore, since the relationship between where a parent and
 * its children is entirely predictable, parent-child priority data is not stored, making this structure space efficient
 * as well.
 *
 * The following is an implementation of a priority queue:
 */
class priorityQueue {
  constructor(maxSize = 1000) {
    this.maxSize = maxSize;
    this.size = 0;
    this.heap = new Array(maxSize).fill(0);
  }

  _getParent(i) {
    return Math.floor(i / 2)
  }

  _getLeftChild(i) {
    return 2 * i;
  }

  _getRightChild(i) {
    return 2 * i + 1;
  }

  _siftUp(i) {
    while (i > 0 && this.heap[this._getParent(i)] < this.heap[i]) {
      [this.heap[this._getParent(i)], this.heap[i]] = [this.heap[i], this.heap[this._getParent(i)]];
      i = this._getParent(i);
    }
  }

  _siftDown(i) {
    let maxIndex = i;
    let leftIndex = this._getLeftChild(i);
    if (leftIndex < this.size && this.heap[leftIndex] > this.heap[maxIndex]) {
      maxIndex = leftIndex;
    }
    let rightIndex = this._getRightChild(i);
    if (rightIndex < this.size && this.heap[rightIndex] > this.heap[maxIndex]) {
      maxIndex = rightIndex;
    }
    if (i !== maxIndex) {
      [this.heap[i], this.heap[maxIndex]] = [this.heap[maxIndex], this.heap[i]];
      this._siftDown(maxIndex);
    }
  }

  insert(priority) {
    if (this.size === this.maxSize) {
      throw "ERROR: exceeded max this.heap size";
    }
    this.heap[this.size] = priority;
    this._siftUp(this.size);
    this.size++;
  }

  extractMax() {
    const result = this.heap[0];
    this.heap[0] = this.heap[this.size];
    this.size--;
    this._siftDown(0);
    return result;
  }

  remove(i) {
    this.heap[i] = Math.Infinity;
    this._siftUp(i);
    this.extractMax();
  }

  changePriority(i, priority) {
    const oldPriority = this.heap[i];
    this.heap[i] = priority;
    if (priority > oldPriority) {
      this._siftUp(i);
    } else {
      this._siftDown(i);
    }
  }
}
