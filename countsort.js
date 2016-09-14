/**
 * FORMULA:
 * Countsort is a non-comparison based sort. Instead of comparing elements to each other, it is given the acceptable
 * range of integers in an array, and it will count the amount of times each number appears in the array and place them
 * into a new array in their correct order and with the number of times each value should appear. Note that countsort
 * should be used only on arrays with a range not exceeding a reasonably low value. It is not desirable to create a few
 * million element arrays to sort a handful of large numbers.
 *
 * EFFICIENCY:
 * Since countsort is a non-comparison based sort, it is able to achieve run times faster than the mathematically
 * possible limit of any comparison based sort. Countsort achieves a runtime of just O(n) versus comparison based sorts
 * such as quicksort and mergesort which have a O(n log n) runtime. Of course, for an array to be a viable candidate for
 * a countsort, the range of the elements must be known and be in a reasonably small range (we shouldn't create an array
 * with a million spots just to sort a 20 item array with values up to a million).
 */
function countsort(inputArr, max) {
  const countArr = new Array(max + 1).fill(0); // max+1 to include 0
  const resultArr = [];

  /**
   * countArr stores the number of times a specific integer occurs. For example countArr[2] will store the number of
   * times "2" occurs in the inputArr. countArr has one element designated for every number in the range.
   */
  for (const item of inputArr) {
    countArr[item] += 1;
  }

  /**
   * The inner loop doesn't increase the complexity of our function since the inner loop is doing n insertions and the
   * outer loop is just providing the number of times to insert each value.
   */
  let position = 0;
  for (let i = 0; i < countArr.length; i++) {
    const count = countArr[i];
    for (let j = 0; j < count; j++) {
      resultArr[position] = i;
      position++;
    }
  }

  return resultArr;
}

countsort([2, 2, 1, 2, 3, 2, 1, 2, 2, 4, 2, 4, 1, 2, 3, 2, 0, 0, 0], 4); 
// => [ 0, 0, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 4, 4 ]
