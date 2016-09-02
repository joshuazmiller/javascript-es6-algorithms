// Euclid's algorithm for finding greatest common divisor also known as greatest common factor.
// Euclid's formula works for any two positive integers.

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
