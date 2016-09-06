/**
 *  In a Hoare quicksort a pivot is taken from the middle of the array. Both sides move from the edges inward
 *  swapping values until they meet in the middle. This results in an average 3x fewer swaps then the Lomuto algorithm.
 *  Its efficiency is O(n log n) although it's possible to hit O(n^2) in cases where bad pivots (pivots that do not
 *  result in a meaningful swap) are consistently chosen.
 */
function quicksort(arr, left = 0, right = arr.length - 1){
  const pivot = partitionHoare(arr, left, right);

  if(left < pivot - 1){
    quicksort(arr, left, pivot-1);
  }

  if(right > pivot){
    quicksort(arr, pivot, right);
  }

  return arr;
}

function partitionHoare(arr, left, right){
  const pivot = Math.floor((left + right)/2);

  while(left < right){

    while(arr[left] <= arr[pivot]){
      left++;
    }
    while(arr[right] >= arr[pivot]){
      right--;
    }

    if(left <= right){
      [arr[left], arr[right]] = [arr[right], arr[left]];
      left++;
      right--;
    }
  }
  return left;
}

quicksort([3,8,6,4,6,1,9,2]); //=> [ 1, 2, 3, 4, 6, 6, 8, 9 ]
