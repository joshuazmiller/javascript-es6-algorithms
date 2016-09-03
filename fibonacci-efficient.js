/**
 * Very efficient compared to a naive solution which would have (2^n). 
 * Since the addition is on extremely large numbers, we don't consider 
 * the addition taking O(1) time but rather O(n) time. This is at least 
 * according to a recorded lecture at UCSD. Therefore both the loop and 
 * the addition inside the loop are each O(n) resulting in an efficiency 
 * of O(n^2).
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
