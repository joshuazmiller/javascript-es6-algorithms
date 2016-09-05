/**
 * A binary search works on a pre-sorted array, low to high. This is an iterative 
 * approach where we calculate the middle index and if the element is not found at that 
 * index then we iteratively slice the array in half until we either find the key or the 
 * array is empty. The running efficiency is O(log n) since even an extremely large n in 
 * just one iteration becomes a problem of size n/2. The primary advantage of the iterative
 * version over the recursive version is that the iterative version takes less stack space.
 */
function binarySearchIterative(arr, key){
  while(arr.length){
    const mid = Math.floor(arr.length / 2);
  	if(key === arr[mid]){
      return "found";
    } else if(key < arr[mid]){
      // We don't do mid-1 because when we calculated mid we took the floor.
      arr = arr.slice(0, mid);
    }else{
      // We do mid+1 because we already know it's not the middle.
      arr = arr.slice(mid + 1);
    }
  }
  return "not found";
}

binarySearchIterative([-5, 8, 12, 17, 20, 60, 75, 77, 88, 913], 913);
