// Very efficient. Can return large numbers in O(n) time.
function fibonacci(n){
  const arr = [];
  arr[0] = 0;
  arr[1] = 1;
  for(let i = 2; i <= n; i++){
    arr[i] = arr[i-1] + arr[i-2];
  }
  return arr[n];
}
