/**
 * FORMULA:
 * Mergesort is a divide-and-conquer approach to sorting. Essentially, the array is recursively split into halves 
 * until all the elements are seperated into their own arrays; the elements are then recursively merged into
 * larger and larger sorted arrays. The reason why this is an effective approach vs. a sorting method like 
 * selection sort, is because with our merge operation we do not have to scan the two arrays we are
 * merging to find the minimum element because the minimum elements will always be the leftmost elements, 
 * so we can simply compare the two leftmost elements and put them in the correct order, and therefore there
 * are just O(n) number of comparison/merging operations. Recursively splitting into subarrays tacks on an
 * O(log n) running time as well, and this results in an O(n log n) computational efficiency. We will prove 
 * this via the Master Theorem.
 *
 * EFFICIENCY:
 * As mentioned, mergesort has a computational efficiency of O(n log n). We can prove this via the Master Theorem.
 * The formula is aT(n/2) + O(n^d) where a = 2 because each time mergesort is called it splits into 2 more recursive
 * calls, and d = 1 because the comparison/merging operation completes in linear time while merging n elements.
 * This means we have 2T(n/2) + O(n^1). The theorem says that if d == log2(a) then we have O(n^d log n). So 
 * log2(2) == 1 and d == 1, so we have O(n log n) like we thought. Also, note that O(n log n) can be shown to be
 * the optimal computational efficiency that any comparison based sorting algorithm can achieve. That said, 
 * mergesort's space complexity is suboptimal compared to an algorithm such as quicksort because mergesort must 
 * create a series of n sub-arrays to store each of the values in their own array when the master array is fully split.
 */
function mergesort(A){
  const n = A.length;
  if(n === 1){
    return A;
  }
  const B = A.slice(0, n/2);
  const C = A.slice(n/2);
  return merge(mergesort(B),mergesort(C));
}
function merge(B, C){
  const D = [];
  while(B.length && C.length){
    if(B[0] <= C[0]){
      D.push(B.shift());
    }else{
      D.push(C.shift());
    }
  }
  return D.concat(B.slice()).concat(C.slice());
}

mergesort([5,8,3,4,6,9,1,2,3,7,1,10,0]); // => [ 0, 1, 1, 2, 3, 3, 4, 5, 6, 7, 8, 9, 10 ]
