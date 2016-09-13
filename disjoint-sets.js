/**
 * This data structure helps with sets. It provides an efficient way to combine set elements into larger sets while
 * achieving merge/union and find times at near constant efficiency O(log*n) which is max O(5) for any reasonable sets.
 * It's a good idea to read the following article to better understand the process involved in this data structure.
 * https://www.topcoder.com/community/data-science/data-science-tutorials/disjoint-set-data-structures/
 */
class disjointSet {
  /**
   * 'this.values' stores the sets starting from integer 0 and incrementing 1,2,3,4 etc. This simplifies our function,
   * but in real world applications additional data might be added to an additional array with corresponding indexes.
   * 'this.parents' stores the relationships between sets. For example value 0 might have a parent 5 which means that 0
   * is in the same set as value 5. A value may have itself as its parent in which case we consider it the root of its
   * set. this.ranks holds the level the value is on with 0 being the bottom most level; this helps us apply the "union
   * by rank" heuristic detailed in
   * https://www.topcoder.com/community/data-science/data-science-tutorials/disjoint-set-data-structures/
   */
  constructor() {
    this.values = [];
    this.parents = [];
    this.ranks = [];
  }

  /**
   * This function takes an array of n elements and makes n sets. Those sets can then be merged with each other to
   * build composite sets. The arr for our purposes must be integers starting with 0 and incrementing 1,2,3 etc. This
   * simplifies the function, but in real world applications it's possible that additional data could be added to each
   * of these indexes.
   */
  preProcess(arr) {
    for (const elm of arr) {
      this.values.push(elm);
      this.parents.push(elm);
      this.ranks.push(0);
    }
  }

  /**
   * Helps with flattening the tree. May be run at any time. This function applies the "path compression" heuristic
   * which allows us to get to constant time or O(log*n) per union or find operation. The heuristic is best defined
   * here: https://www.topcoder.com/community/data-science/data-science-tutorials/disjoint-set-data-structures/
   */
  postProcess(){
    for (let i = 0; i < this.values.length; i++) {
      this.pathCompression(i)
    }
  }

  printValues() {
    return [this.values, this.parents, this.ranks];
  }

  findParent(a) {
    while (a !== this.parents[a]) {
      a = this.parents[a];
    }
    return a;
  }

  /**
   * This function flattens the tree structure thereby minimizing its height and optimizing its efficiency. Before
   * running this function the structure may have become suboptimal with children of parents that are themselves
   * children of the root. Doing this leaves us with constant time efficiency on operations such as union and find
   * since the tree structure is so shallow. The tree structure after running this function will be log*n which is
   * <= 5 even on values up to 2^65536 elements which we can consider a constant for all reasonable purposes.
   */
  pathCompression(i) {
    if (i !== this.parents[i]) {
      this.parents[i] = this.pathCompression(this.parents[i]);
    }
    return this.parents[i];
  }

  union(a, b) {
    let a_id = this.findParent(a);
    let b_id = this.findParent(b);
    if (a_id === b_id) {
      // They are already in the same set so there is nothing to do.
      return;
    } else if (this.ranks[a_id] > this.ranks[b_id]) {
      // The parent with the highest rank is by definition the tree with the largest height. As such, to minimize total
      // height (and thereby efficiency) we make the smaller tree a subtree of the larger one.
      this.parents[b_id] = a_id;
    } else {
      this.parents[a_id] = b_id;
      if (this.ranks[a_id] === this.ranks[b_id]) {
        // Since the heights are equal and 'a' is now a subtree of 'b' then by definition 'b's height increased to
        // swallow 'a' so we increase its rank.
        this.ranks[b_id] += 1;
      }
    }
  }
}

/**
 * An example function to see the inner workings of this data structure. Each output to console gives us a glimpse into
 * the 3 arrays in this format: [this.values, this.parents, this.ranks]
 */
function test() {
  const a = new disjointSet();
  a.preProcess([0, 1, 2, 3, 4, 5]);
  console.log(a.printValues());
  a.union(2, 3);
  console.log(a.printValues());
  a.union(4, 3);
  console.log(a.printValues());
  a.union(0, 5);
  console.log(a.printValues());
  a.union(5, 3);
  console.log(a.printValues());
  a.union(2, 3);
  a.postProcess();
  console.log(a.printValues());
}
test();
