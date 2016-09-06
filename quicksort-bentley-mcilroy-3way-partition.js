/**
 * The Bentley-McIlroy 3-way partitioning schema is an exceptionally efficient quicksort algorithm which speeds up the
 * swapping of duplicate values exponentially. Sorting a series which contains many duplicate values with an Hoare or Lomuto
 * quicksort quickly crawls to quadratic O(n^2) time because when an element is compared to its duplicate the partitioning
 * operation is just as ineffective as when picking the smallest or largest value in the array as a partition. The Bentley
 * schema instead of uselessly swapping a duplicate value to the opposite side of the array, ensures that a duplicate value
 * ends up next to its pivot. This creates a drastic improvement because not only is the swap useful and effective but it
 * also expands the left and right bounds of the already sorted elements, making duplicates actually speed up the sort and
 * have a positive impact!
 *
 * METHOD:
 * When a pivot is compared to a duplicate value, after performing the usual left<=>right swap, it is swapped again to the
 * left-most or right-most part of the array (depending on the side it's on) which are partitions 1 and 3. After all the
 * values on either side of the pivot have been properly swapped to the appropriate side, the elements in partitions 1
 * and 3 are merged into the middle right next to the pivot. The left and right bounds remaining to be sorted are then 
 * expanded to exclude the merged items.
 *
 * EFFICIENCY:
 * Performs O(n log n) even when there are duplicates in the array. A pivot with a duplicate is considered an optimal choice
 * vs. Hoare or Lomuto schemes where such pivots tilt towards quadratic time.
 */
function quicksort(arr, left = 0, right = arr.length - 1){
  const pivot = arr[right];
  let leftIndex = left-1, specialLeftPartitionIndex = left-1;
  let rightIndex = right, specialRightPartitionIndex = right;
  if (right <= left){
    return;
  }
  while(true){
    // we search for the next element on the left that is larger than (or equal to) the pivot and is therefore swap worthy
    while(arr[++leftIndex] < pivot);

    // we search for the next element on the right that is less than (or equal to) the pivot and is therefore swap worthy
    while(arr[--rightIndex] > pivot);

    // there's nothing to swap anymore
    if(leftIndex >= rightIndex){
      break;
    }

    // Perform main swap. We do this before the special swaps because if one element is equal to pivot and one is
    // not, then the one that is not belongs on the other side of pivot anyway; in that case, the one that is equal
    // will still be swapped to the special equal-partition just on the opposite side.
    [arr[leftIndex], arr[rightIndex]] = [arr[rightIndex], arr[leftIndex]];

    // Perform special swaps to the equal-partitions which are present on both the left and right sides of the main
    // partition e.g. partitions 1 and 3.
    if(arr[leftIndex] === pivot){
      specialLeftPartitionIndex++;
      // We move it all the way to the left, into partition 1.
      [arr[specialLeftPartitionIndex], arr[leftIndex]] = [arr[leftIndex], arr[specialLeftPartitionIndex]];
    }
    if(pivot === arr[rightIndex]){
      specialRightPartitionIndex--;
      // We move it all the way to the right, into partition 3.
      [arr[rightIndex], arr[specialRightPartitionIndex]] = [arr[specialRightPartitionIndex], arr[rightIndex]];
    }
  }
  // We swap the rightmost element which is our pivot into the middle of the array.
  [arr[leftIndex], arr[right]] = [arr[right], arr[leftIndex]];

  // We need to move the right-index right in front of the pivot.
  rightIndex = leftIndex-1;
  // We swap from the left edge of the entire input array (which contains partition 1) to the spot next to the pivot.
  for(let k = left; k < specialLeftPartitionIndex; k++, rightIndex--){
    [arr[k], arr[rightIndex]] = [arr[rightIndex], arr[k]];
  }

  // The left index is the index of the pivot so we ++ to move it to the right of the pivot. We place k at the very
  // right of the input array which is the right-edge of partition 3. We then swap partition 3 into the middle next
  // to the pivot.
  leftIndex++;
  for(let k = right-1; k > specialRightPartitionIndex; k--, leftIndex++){
    [arr[leftIndex], arr[k]] = [arr[k], arr[leftIndex]];
  }

  // Note that rightIndex and leftIndex now exclude the duplicates swapped into the middle, thereby reducing work further.
  quicksort(arr, left, rightIndex);
  quicksort(arr, leftIndex, right);
  return arr;
}

// This does 10 recursive calls to quicksort vs. 24 recursive calls in a Hoare based quicksort.
quicksort([4,3,2,6,4,7,3,2,2,3,3,4,5,1,5,3,2,3,1,3,1,1,2,1,2,3]); 
// => [ 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 5, 5, 6, 7 ]
