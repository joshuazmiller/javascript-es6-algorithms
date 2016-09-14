/**
 * This file illustrates the implementation of a hashmap including the use of optimal hashing mechanisms for
 * both integers and strings that reduce collisions while minimizing allocated memory and providing constant
 * runtime. The standard add(key, value), find(key), and remove(key) helper methods will be implemented as well
 * and will account for possible collisions. The computational efficiency of this optimized hashmap is O(1 + alpha)
 * where alpha is the load factor of 'number of keys / allocated storage'. Because there should be no collisions, 
 * the storage size will be O(m) where m is the allocated storage (also called cardinality).
 */
class HashMap {
  constructor(size = 1024) {
    this.buckets = [];
    this.size = size;
    this.numberOfKeys = 0;
    this.prime = this._getPrime(this.size);
    this.a = this._getRandom(1, this.prime - 1);
    this.b = this._getRandom(0, this.prime - 1);
  }

  /**
   * This hashing function achieves an optimal collision frequency of 1/m by using a prime integer larger than m
   * (m is the bucket size and officially called the cardinality) and by choosing a random hash function from the
   * universal hash family by pre-setting this.a and this.b to random values.
   * Efficiency:
   * Using a hash function from a universal hash family provides us with a longest chain of only 1. The resulting
   * computational efficiency is O(1 + alpha) where alpha is the load factor n/m (n is number of keys, and m is the
   * bucket size). We want the load factor (alpha) to be between .5 and 1. We want it less than 1 because we want to
   * ensure 1/m collisions, but more than .5 because we don't want to waste unnecessary space. The hash table takes
   * O(m) memory. To allocate the correct value of m, we use a rehash function which is called whenever n/m becomes
   * more than 0.9. The rehash function copies and rehashes the current bucket into a larger bucket. This function is
   * defined later in this class.
   */
  _integerHash(int) {
    const hash = ((this.a * int + this.b) % this.prime) % this.size;
    return hash;
  }

  /**
   * This method of hashing strings is referred to as a polyhash because it effectively creates a polynomial of
   * "(str[0] + str[1]x + str[2]x^2 etc.) mod p". This method is used as the hashing mechanism in Java's hashmap.
   * Efficiency:
   * The probability of a collision is at most 1/m + L/p where m is this.size and L is the length of the string and p
   * is the prime number used in the hash function. Since we are free to use a very large 'p' without slowing the
   * algorithm, the L/p can be reduced to an infinitesimal value. This leaves us with a collision probability factor of
   * just 1/m and therefore a universal hash function. Using a universal hash function leaves us with a computational
   * efficiency of O(1 + alpha) where alpha is the load factor n/m (number of keys / allocated size of bucket).
   */
  _stringHash(str) {
    const MAX_ASCII = 122;
    let hash = 0;
    for (const letter of str) {
      const code = letter.charCodeAt(0);
      hash = (hash * MAX_ASCII + code) % this.prime;
    }
    return this._integerHash(hash);
  }

  /**
   * If the load factor which is numberOfKeys / size becomes greater than 0.9 then it's time to rehash because the
   * chance of collisions has grown beyond the acceptable rate for optimal performance. Although this function runs
   * in O(n), since this function is run extremely infrequently it does not impact the amortized efficiency of the
   * hashmap.
   */
  _rehash() {
    console.log("rehashing");
    const oldBucket = this.buckets;
    const oldSize = this.size;
    this.size *= 2;
    this.buckets = [];
    for (const item of oldBucket) {
      if (item !== undefined) {
        for (const elm of item) {
          this.add(elm.key, elm.value);
        }
      }
    }
  }

  /**
   * Get a prime number larger than the universe of the possible values to hash. The purpose of using such a prime is
   * so that we get a near perfect distribution across m where m is the bucket size. Having a near perfect distribution
   * leads to the longest chain being at most 1 element with no collisions. This leads to the best optimal search times
   * of O(1 + alpha) where alpha is the load time of the hash table. For optimal speed, we include a pre-populated list
   * of prime numbers based on buckets of size 2^x. The values were taken from http://planetmath.org/goodhashtableprimes
   */
  _getPrime(size) {
    let prime;
    if (size >= 1073741824) { // 2^30
      prime = 1610612741;
    } else if (size >= 536870912) { // 2^29
      prime = 805306457;
    } else if (size >= 268435456) { // 2^28
      prime = 402653189;
    } else if (size >= 268435456) { // 2^27
      prime = 201326611;
    } else if (size >= 268435456) { // 2^26
      prime = 100663319;
    } else if (size >= 268435456) { // 2^25
      prime = 50331653;
    } else if (size >= 268435456) { // 2^24
      prime = 25165843;
    } else if (size >= 268435456) { // 2^23
      prime = 12582917;
    } else if (size >= 268435456) { // 2^22
      prime = 6291469;
    } else if (size >= 268435456) { // 2^21
      prime = 3145739;
    } else if (size >= 268435456) { // 2^20
      prime = 1572869;
    } else if (size >= 268435456) { // 2^19
      prime = 786433;
    } else if (size >= 268435456) { // 2^18
      prime = 393241;
    } else if (size >= 268435456) { // 2^17
      prime = 196613;
    } else if (size >= 268435456) { // 2^16
      prime = 98317;
    } else if (size >= 268435456) { // 2^15
      prime = 49157;
    } else if (size >= 268435456) { // 2^14
      prime = 24593;
    } else if (size >= 268435456) { // 2^13
      prime = 12289;
    } else if (size >= 268435456) { // 2^12
      prime = 6151;
    } else if (size >= 268435456) { // 2^11
      prime = 3079;
    } else if (size >= 268435456) { // 2^10
      prime = 1543;
    } else { // < 2^10 == < 1024
      prime = 769;
    }
    return prime;
  }

  _getRandom(boundLeft, boundRight) {
    const offset = boundLeft;
    const t = boundRight - offset;
    const random = Math.round(Math.random() * t + offset);
    return random;
  }

  _hash(key) {
    let hash;
    if (typeof key === "number") {
      hash = this._integerHash(key);
    } else {
      hash = this._stringHash(key);
    }
    return hash;
  }

  add(key, value) {
    const hash = this._hash(key);
    if (this.buckets[hash] === undefined) {
      this.buckets[hash] = [];
      this.buckets[hash].push({key, value});
    } else {
      for (const elm of this.buckets[hash]) {
        if (elm.key === key) {
          elm.value = value;
          return;
        }
      }
      this.buckets[hash].push({key, value});
    }
    this.numberOfKeys++;
    if (this.numberOfKeys / this.size > 0.9) {
      this._rehash();
    }
  }

  find(key) {
    const hash = this._hash(key);
    if (this.buckets[hash] === undefined) {
      return "not found";
    }
    for (const elm of this.buckets[hash]) {
      if (elm.key === key) {
        return elm.value;
      }
    }
    return "not found";
  }

  remove(key) {
    const hash = this._hash(key);
    const buckets = this.buckets;
    if (buckets[hash] === undefined) {
      return "not found";
    }
    for (let i = 0; i < buckets[hash].length; i++) {
      if (buckets[hash][i].key === key) {
        // chaining is infrequent so a splice and resize of i is not costly
        buckets[hash].splice(i, 1);
        if (buckets[hash].length === 0) {
          buckets[hash] = undefined; // don't splice and trigger a resize
        }
        this.numberOfKeys--;
        return "success";
      }
    }
    return "not found";
  }

  print() {
    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i] !== undefined) {
        console.log(this.buckets[i], i);
      }
    }
  }
}

function test() {
  const map = new HashMap(1);
  map.add(6108887654, "robert");
  map.add(4107771234, "monika");
  map.add("chris", "100 main street");
  console.log(map.find(6108887654)); // robert
  console.log(map.find(4107771234)); // monika
  console.log(map.find("chris")); // 100 main street
  console.log(map.find("holly")); // not found
  console.log(map.find(8009997890)); // not found
  console.log(map.remove("chris")); // success
  console.log(map.find("chris")); // not found
  console.log(map.remove("tomas")); // not found
  map.print(); // [ { key: 6108887654, value: 'robert' } ] index, [ { key: 4107771234, value: 'monika' } ] index
}
test();
