//Euclid's algorithm for finding greatest common factor. Discussed on page 2 of TACP (knuth). Works for a set of positive integers.

function euclid(m, n){
  // make sure m is >= n (can save a step in the loop)
  if(m < n){
    [m, n] = [n, m];
  }
  // meat of algorithm
  let r;
  while(true){
    r = m % n;
    if (r === 0) {
      return n;
    }
    m = n;
    n = r;
  }
}
