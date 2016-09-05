/**
 * INPUTS:
 * Inputs A and B are polynomials expressed as arrays filled only with their constants. Before explaining the 
 * polynomial representation further, here's an example. [2,2] represents the polynomial 2x + 2 while [3,5,4] 
 * represents 3x^2 + 5x + 4. Bascially, the rightmost element of each array is assumed to have x^0 added to 
 * its constant, while the leftmost element is assumed to have x^(n - 1) where n is the length of the array. 
 * This is the shorthand for representing polynomials in our function. Additionally, if one of the arrays is 
 * shorter than the other then the array that is shorter should be padded on the left with 0s. For example, 
 * if you have (2x + 2)(3x^2 + 5x + 4) they should be provided as inputs to our function in the format [0,2,2] 
 * and [3,5,4].
 * 
 * MATH:
 * This is a representation of the Karatsuba mathematical approach to solving polynomials. Karatsuba's insight
 * is that you can make 3 recursive multiplications instead of the 4 recursive multiplications that the classic
 * approach to polynomial multiplication requires. It is arguably easier to reason about since the middle isn't 
 * split into 2 recursive calls like the classical method but rather stays in one piece.
 * 
 * EFFICIENCY:
 * This function runs with an efficiency of O(n^1.58). This stems from the Master Theorem of aT(n/2) + O(n^d)
 * which in our case a = 3 because we split into 3 branches per iteration and d = 1 because the meat of the 
 * function runs in O(n^1) time, so since log2(3) which is 1.58 is greater than d, according to the theorem we
 * get O(n^log2(a)) which in our case is O(n^1.58). This is more efficient than the classical method which 
 * splits to 4 branches per iteration and computes as being O(n^2). You can check that out in the classical 
 * recursive algorithm I wrote for polynomial multiplication.
 */
function polynomialMultiplicationWrapper(A, B){
  let n = A.length;
  // For mathematical algorithmic purposes we need the lengths of the arrays to be a power of 2 (basically we 
  // need a max degree with a value of 2^x - 1). If we don't have that then we simply pad the polynomial with 
  // coefficients of 0's.
  while((n & (n - 1)) !== 0){ // check if the array lengths are a power of 2
    A.unshift(0);
    B.unshift(0);
    n = A.length;
  }
  return polynomialMultiplication(A, B);
}
function polynomialMultiplication(A, B){
  // The array "product" will store constants representing an identical format for polynomials as inputs A and B
  // which require padding with 0's to work.
  const n = A.length;
  let product = new Array(2 * n - 2).fill(0); // 2n - 2 will be the number of terms from a polynomial multiplication.
  if(n === 1){
    product[0] = A[0] * B[0];
    return product;
  }

  //D1
  const D1 = A.slice(0, A.length/2);
  //D0
  const D0 = A.slice(A.length/2);
  //E1
  const E1 = B.slice(0, B.length/2);
  //E0
  const E0 = B.slice(B.length/2);
  //D1 + D0
  const D1plusD0 = D1.map((val, index)=>{
    return val + D0[index];
  });
  //E1 + E0
  const E1plusE0 = E1.map((val, index)=>{
    return val + E0[index];
  });
  
  const D1E1 = polynomialMultiplication(D1, E1);
  const D0E0 = polynomialMultiplication(D0, E0);
  
  //(D1 + D0) * (E1 + E0) - D1E1 - D0E0 <= this is Karatsuba insight that the middle can be calculated like this
  const D1plusD0xE1plusE0 = polynomialMultiplication(D1plusD0, E1plusE0);
  const middle = D1plusD0xE1plusE0.map((val, index)=>{
    return val - D1E1[index] - D0E0[index];
  });
  
  // Overwrite portions of the product array.
  D1E1.map((val, index)=>{
    product[index] = val;
  });
  D0E0.map((val, index)=>{
    product[n + index] = val;
  });
  middle.map((val, index)=>{
    // This is simply the middle portion bounded on the left and right. We add to the current values.
    if(n/2+index <= n+n/2-2){ 
      product[n/2 + index] += val;
    }
  });
  return product;
}

//(2x + 2)(2x + 2) => [ 4, 8, 4 ] which means 4x^2 + 8x + 4
polynomialMultiplicationWrapper([2,2],[2,2]);

//(2x + 2)(3x^2 + 5x + 4) => [ 0, 6, 16, 18, 8 ] which means 6x^3 + 16x^2 + 18x + 8
polynomialMultiplicationWrapper([0,2,2],[3,5,4]);

//(4x^3 + 3x^2 + 2x + 1)(x^3 + 2x^2 + 3x + 4) => [ 4, 11, 20, 30, 20, 11, 4 ] which means 4x^6 + 11x^5 + 20x^4 + 30x^3 + 20x^2 + 11x + 4
polynomialMultiplicationWrapper([4,3,2,1],[1,2,3,4]);
