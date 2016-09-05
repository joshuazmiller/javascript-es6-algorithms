/**
 * A binary search works on a pre-sorted array, low to high. This is a divide and conquer 
 * approach where we calculate the middle index and if the element is not found at that 
 * index then we recursively slice the array in half until we either find the key or the 
 * array is empty. The running efficiency is O(log n) since even an extremely large n in 
 * just one iteration becomes a problem of size n/2 and the meat of the function runs
 * in constant time. The primary disadvantage of the recursive version compared to the 
 * iterative version is that the recursive version takes more stack space.
 * 
 * Master Theorem Efficiency Analysis:
 * In terms of the Master Theorem aT(n/2) + O(n^d) we have a = 1 because each iteration 
 * takes the same amount of work, and d = 0 because the meat of the function runs in constant 
 * time O(1) which is O(n^0), this leaves us with d == log2(a) since log2(1) is also 0, 
 * so according to the Theorem when d == log2(a) we get O(n^d log n) which in our case 
 * is O(n^0 log n) which is the same as O(log n). 
 */
function binarySearchRecursive(arr, key){
  if(!arr.length){
    return "not found";
  }
  const mid = Math.floor(arr.length / 2);
  if(key === arr[mid]){
    return "found";
  } else if(key < arr[mid]){
    // We don't do mid+1 because when we calculated mid we took the floor.
    return binarySearchRecursive(arr.slice(0, mid), key);
  }else{
    // We do mid+1 because we already know it's not the middle.
    return binarySearchRecursive(arr.slice(mid + 1), key);
  }
}

binarySearchRecursive([-5, 8, 17, 20, 60, 75, 77, 88, 913], 913);
