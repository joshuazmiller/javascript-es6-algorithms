/**
 * METHOD:
 * The heap-sort algorithm leverages a binary-heap structure similar to a priority queue in which elements are arranged
 * such that the topmost element is always the maximum value. After arranging the array in this structure, the maximum
 * element is pulled from the 0 index and placed at the end of the array where it belongs. The size variable holding
 * the size of the array is decremented and the sift is performed again bringing the next maximum element to the top.
 * The next maximum is pulled off the top and placed at arr[size] which is right before the previous max. This continues
 * until the size variable is 0 and there are no more elements left to sort.
 *
 * EFFICIENCY:
 * Heapsort performs in its worst case at O(n log n) time while also sorting in-place without taking additional space.
 * It takes O(n log n) time because we call siftDown roughly n/2 times and each siftDown operation takes a maximum of
 * log n number of swaps to get to the correct position. Heapsort has an advantage over quicksort in that quicksort has
 * an average O(n log n) time but can perform as poorly as O(n^2) in some circumstances. Heapsort always performs worst
 * case O(n log n). However, in practice quicksort tends to be faster (at least according to a lecture at UCSD). There
 * is also a method called introsort which starts out with a quicksort but if it detects that the quicksort is running
 * suboptimally then it switches to using the heapsort algorithm.
 */
function heapsort(arr){
  let size = arr.length - 1;
  // We only need to worry about sifting down arr[length/2] to 0 because the bottom elements have nowhere lower to go.
  for(let i = arr.length/2; i >= 0; i--){
    siftDown(i);
  }
  // We place the top most element, arr[0], which is the maximum element, at the end of the array where it belongs. We
  // then reduce the "size" so that the next sift ignores that element, and so that the next max element goes to the
  // second to last spot and so on.
  for(const elm of arr){
    [arr[0], arr[size]] = [arr[size], arr[0]];
    size--;
    siftDown(0);
  }
  function siftDown(i) {
    let maxIndex = i;
    // A parent's children are always at the 2i and 2i+1 positions in a binary heap.
    let leftIndex = 2 * i;
    if (leftIndex <= size && arr[leftIndex] > arr[maxIndex]) {
      maxIndex = leftIndex;
    }
    let rightIndex = 2 * i + 1;
    if (rightIndex <= size && arr[rightIndex] > arr[maxIndex]) {
      maxIndex = rightIndex;
    }
    if (i !== maxIndex) {
      [arr[i], arr[maxIndex]] = [arr[maxIndex], arr[i]];
      siftDown(maxIndex);
    }
  }
  return arr;
}
