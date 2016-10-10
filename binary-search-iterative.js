/**
 * A binary search works on a pre-sorted array, low to high. This is an iterative approach where we calculate the middle
 * index and if the element is not found at that index then we iteratively slice the array in half until we either find 
 * the key or the array is empty. The running efficiency is O(log n) since even an extremely large n in just one 
 * iteration becomes a problem of size n/2. The primary advantage of the iterative version over the recursive version is
 * that the iterative version takes less stack space.
 */
function binarySearchIterative(arr, key){
  let high = arr.length - 1, low = 0,
    mid = Math.floor((high - low) / 2);
  while(key !== arr[mid]){
    if(mid === 0 || mid === high){
      return -1;
    }
    if(key < arr[mid]){
      high = mid;
      mid -= Math.ceil((high - low) / 2);
    }else{
      low = mid;
      mid += Math.ceil((high - low) / 2);
    }
  }
  return mid;
}

binarySearchIterative([-5, 8, 12, 17, 20, 60, 75, 77, 88, 913], -5);  //0
binarySearchIterative([-5, 8, 12, 17, 20, 60, 75, 77, 88, 913], 8);   //1
binarySearchIterative([-5, 8, 12, 17, 20, 60, 75, 77, 88, 913], 12);  //2
binarySearchIterative([-5, 8, 12, 17, 20, 60, 75, 77, 88, 913], 17);  //3
binarySearchIterative([-5, 8, 12, 17, 20, 60, 75, 77, 88, 913], 20);  //4
binarySearchIterative([-5, 8, 12, 17, 20, 60, 75, 77, 88, 913], 60);  //5
binarySearchIterative([-5, 8, 12, 17, 20, 60, 75, 77, 88, 913], 75);  //6
binarySearchIterative([-5, 8, 12, 17, 20, 60, 75, 77, 88, 913], 77);  //7
binarySearchIterative([-5, 8, 12, 17, 20, 60, 75, 77, 88, 913], 88);  //8
binarySearchIterative([-5, 8, 12, 17, 20, 60, 75, 77, 88, 913], 913); //9
binarySearchIterative([-5, 8, 12, 17, 20, 60, 75, 77, 88, 913], 13);   //-1
binarySearchIterative([-5, 8, 12, 17, 20, 60, 75, 77, 88, 913], 1000); //-1
binarySearchIterative([-5, 8, 12, 17, 20, 60, 75, 77, 88, 913], -10);  //-1
