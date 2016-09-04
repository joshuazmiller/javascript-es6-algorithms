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
 * This function runs with an efficiency of O(n^2).
 */
function polynomialMultiplicationNaive(A, B){
  // `product` will store an array of constants representing an identical format for polynomials as inputs A and B.
  const product = new Array(2 * A.length - 1).fill(0); // 2n - 2 will be the number of terms from a polynomial multiplication.
  
  // Note A and B are of equal size as noted in the INPUT section of the comments.
  for(let i = 0; i < A.length; i++){
    for(let j = 0; j < B.length; j++){
		product[i+j] += A[i] * B[j];
    }	
  }
  return product;
}

polynomialMultiplicationNaive([2,2],[2,2]); // (2x + 2)(2x + 2) => [ 4, 8, 4 ] which means 4x^2 + 8x + 4
polynomialMultiplicationNaive([0,2,2],[3,5,4]); // (2x + 2)(3x^2 + 5x + 4) => [ 0, 6, 16, 18, 8 ] which means 6x^3 + 16x^2 + 18x + 8
