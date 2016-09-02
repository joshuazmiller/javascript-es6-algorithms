/**
 * Euclid's algorithm for finding greatest common divisor also known as greatest common factor.
 * Euclid's formula works for any two positive integers.
 * The variable r stands for remainder.
 * Wikipedia on worst-case: "The Euclidean algorithm always needs less than O(h) divisions, 
 * where h is the number of digits in the smaller number b." In other words, very, very fast.
 */
function gcd(a,b){
  let r, temp;
  do {
    temp = b;
    r = a % b;
    a = b;
    b = r;
  } while(r !== 0);
  return temp;
}
