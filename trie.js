/**
 *  A trie is an efficient way of storing words that share a set of letters. Every shared prefix between two or more
 *  words is only inserted once and the non-shared components branch out where the words diverge. This can lead to a
 *  significantly more efficient space complexity and for many pattern matching applications a far more efficient runtime.
 *
 *  One useful application of a trie is searching for various patterns in a piece of text. A brute force approach would
 *  require searching for each pattern individually while making a run through the entire text. This leads to
 *  O(|text| * |length of all patterns|) which can be a huge number. By using a trie we only need to search through the
 *  text one time. This leads to O(|text| * |longest pattern|) which is far more efficient. See the searchText function
 *  for this application.
 */
class TrieNode {
  constructor() {
    this.isEnd = false;
    this.children = [];
  }

  containsKey(char) {
    return this.children[char] != null;
  }

  get(char) {
    return this.children[char];
  }

  put(char, node) {
    this.children[char] = node;
  }

  setEnd() {
    this.isEnd = true;
  }

  isEnd() {
    return this.isEnd;
  }
}
class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  // Inserts a word into the trie. Time complexity O(|word|). Space complexity O(|word|).
  insert(word) {
    let node = this.root;
    for (let i = 0; i < word.length; i++) {
      let currentChar = word.charAt(i);
      if (!node.containsKey(currentChar)) {
        node.put(currentChar, new TrieNode());
      }
      node = node.get(currentChar);
    }
    node.setEnd();
  }

  // Search for a prefix in the trie and returns the node where search ends. Time complexity O(|word|).
  // Space complexity O(1).
  searchPrefix(word) {
    let node = this.root;
    for (let i = 0; i < word.length; i++) {
      let curLetter = word.charAt(i);
      if (node.containsKey(curLetter)) {
        node = node.get(curLetter);
      } else {
        return null;
      }
    }
    return node;
  }

  // Returns if the word is in the trie. Time complexity O(|word|). Space complexity O(1).
  search(word) {
    let node = this.searchPrefix(word);
    return node != null && node.isEnd;
  }

  // Returns if there is any word in the trie that starts with the given prefix. Time complexity O(|word|).
  // Space complexity O(1).
  startsWith(prefix) {
    let node = this.searchPrefix(prefix);
    return node != null;
  }

  // Returns all the words in the trie that can be found in the text. Time complexity O(|text| * |longest pattern|).
  // Space complexity O(|the size of all patterns|) in the worst case where no patterns overlap.
  searchText(text) {
    const results = [];
    while (text.length) {
      for (let i = 1; i < text.length; i++) {
        let segment = text.substr(0, i);
        if (this.search(segment)) {
          results.push(segment);
        } else if (!this.startsWith(segment)) {
          break;
        }
      }
      text = text.substr(1);
    }
    return results;
  }
}

const a = new Trie();
a.insert('and');
a.insert('anna');
a.insert('banana');
console.log(a.search('and')); // true
console.log(a.startsWith('n')); // false
console.log(a.startsWith('b')); // true
console.log(a.searchPrefix('bana')); // TrieNode {isEnd: false, children: [ n: TrieNode { isEnd: false, children: [Object] } ] }
console.log(a.searchPrefix('banana')); // TrieNode { isEnd: true, children: [] }
console.log(a.searchPrefix('ana')); // null
console.log(a.search('ban')); // false
console.log(a.search('banana')); // true
console.log(a.searchText('bananasands')); // [ 'banana', 'and' ]
