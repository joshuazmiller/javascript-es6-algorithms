/**
 * A binary search works on a pre-sorted array, low to high. This is an iterative approach where we calculate the middle
 * index and if the element is not found at that index then we iteratively slice the array in half until we either find 
 * the key or the array is empty. The running efficiency is O(log n) since even an extremely large n in just one 
 * iteration becomes a problem of size n/2. The primary advantage of the iterative version over the recursive version is
 * that the iterative version takes less stack space.
 */
function binarySearchIterative(arr, key){
  let high = arr.length, low = 0, mid;
  while(low <= high){
  	mid = Math.floor((high + low) / 2);
    if(arr[mid] > key){
      high = mid - 1;
    }else if(arr[mid] < key){
      low = mid + 1;
    }else{
      return mid;
    }
  }
  return -1;
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
binarySearchIterative([-5, 8], -5);  //0
binarySearchIterative([-5, 8], 8);   //1
