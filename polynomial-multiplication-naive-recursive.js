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
 * This is a representation of the classical mathematical approach to solving polynomials by hand. To implement 
 * the classical method requires a divide-and-conquer technique which is actually quite complicated. It's based
 * off even more complex pseudo code provided on a recorded lecture given by Neil Rhodes at UCSD. 
 * 
 * EFFICIENCY:
 * This function runs with an efficiency of O(n^2) or more precisely k*4n^2 since there are 4 branches which 
 * each take n^2 time. This note is important because it's a precursor to the Karatsuba algorithm which cuts
 * the formula to only 3 branches which is a noticable improvement because 3^(log2 n) equals n^1.58 so with
 * Karatsuba we have O(n^1.58). That's why this method is called "naive" since the Karatsuba is better.
 */
function polynomialMultiplicationWrapper(A, B){
  let n = A.length;
  // For mathematical algorithmic purposes we need the lengths of the arrays to 
  // be a power of 2 (basically we need a max degree with a value of 2^x - 1). If we don't have that 
  // then we simply pad the polynomial with coefficients of 0's.
  while((n & (n - 1)) !== 0){ // check if the array lengths are a power of 2
    A.unshift(0);
    B.unshift(0);
    n = A.length;
  }
  return polynomialMultiplication(A, B, n, 0, 0);
}
function polynomialMultiplication(A, B, n, a, b){
  // The array "product" will store constants representing an identical format for polynomials as inputs A and B
  // which require padding with 0's to work.
  const product = new Array(2 * n - 2).fill(0); // 2n - 2 will be the number of terms from a polynomial multiplication.
  if(n === 1){
    product[0] = A[a] * B[b];
    return product;
  }

  // Left 
  polynomialMultiplication(A, B, n/2, a, b).map((val, index)=>{
    product[index] = parseInt(val);
  });
  // Right
  polynomialMultiplication(A, B, n/2, a + n/2, b + n/2).map((val, index)=>{
    product[n + index] = parseInt(val);
  });
  // Middle
  const middle = [];
  const middleLeft = polynomialMultiplication(A, B, n/2, a + n/2, b);
  const middleRight = polynomialMultiplication(A, B, n/2, a, b + n/2);
  middleLeft.map((val, index) => {
    middle.push(parseInt(val) + parseInt(middleRight[index]));
  });
  middle.map((val, index)=>{
    if(n/2+index <= n+n/2-2){ // this is simply the middle portion bounded on the left and right
      product[n/2 + index] += val;
    }
  });
  
  return product;
}

polynomialMultiplicationWrapper([2,2],[2,2]); // (2x + 2)(2x + 2) => [ 4, 8, 4 ] which means 4x^2 + 8x + 4
polynomialMultiplicationWrapper([0,2,2],[3,5,4]); // (2x + 2)(3x^2 + 5x + 4) => [ 0, 6, 16, 18, 8 ] which means 6x^3 + 16x^2 + 18x + 8
