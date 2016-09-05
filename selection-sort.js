/**
 * FORMULA:
 * This sort works by iteratively scanning the unsorted portion of an array for the next minimum value 
 * and then swapping it to the front of the unsorted portion. Effectively with each iteration the problem 
 * is reduced to a sub-problem because all the values remaining in the unsorted portion are larger or
 * equal to the last value of the sorted portion. This can be viewed as a 'greedy' algorithm as its 
 * mechanism is to choose the next safe-step and then reduce the problem to a sub-problem. 
 *
 * EFFICIENCY:
 * Due to its nested loop structure its operational efficiency is O(n^2). However its space complexity 
 * is O(1) since no additional arrays need to be created to complete the sort. Its operational efficiency 
 * is O(n^2) even though the unsorted portion of the array becomes incrementally smaller. This is the 
 * case because the algorithm is a manifistation of an arithmetic series which reduces to n(n+1)/2. We 
 * can safely ignore the constants and we have O(n^2).
 */
function selectionSort(arr){
  const n = arr.length;
  for(let i = 0; i < n; i++){
    for(let j = i + 1; j < n; j++){
      if(arr[j] < arr[i]){
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
  }
  return arr;
}

selectionSort([5,8,3,4,6,9,1,2,3,7,1,10,0]); // => [ 0, 1, 1, 2, 3, 3, 4, 5, 6, 7, 8, 9, 10 ]
