/**
 * Very efficient compared to a naive solution which would have (2^n). 
 * It can return large numbers in O(n^2) time. The reason why O(n^2) is
 * we consider the 'for' statement as O(n) and since the addition inside 
 * the loop is going to be adding very large numbers it is not a regular
 * addition of O(1) but rather O(n) as well. This is at least according
 * to a lecture at UCSD.
 */
function fibonacci(n){
  const arr = [];
  arr[0] = 0;
  arr[1] = 1;
  for(let i = 2; i <= n; i++){
    arr[i] = arr[i-1] + arr[i-2];
  }
  return arr[n];
}
