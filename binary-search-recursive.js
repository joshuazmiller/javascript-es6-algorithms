/**
 * A binary search works on a pre-sorted array, low to high. This is a divide and conquer 
 * approach where we calculate the middle index and if the element is not found at that 
 * index then we recursively slice the array in half until we either find the key or the 
 * array is empty. The running efficiency is O(log n) since even an extremely large n in 
 * just one iteration becomes a problem of size n/2. The primary disadvantage of the 
 * recursive version compared to the iterative version is that the recursive version takes 
 * more stack space.
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
