/**
 * FORMULA:
 * Countsort is a non-comparison based sort. Instead of comparing elements to each other, it is given the
 * acceptable range of integers in an array, and it will count the amount of times each number appears in
 * the array. It stores the amount of times each number appears in a corresponding index in a count array.
 * It then uses the amount of times each number appears to create another array which indicates where each
 * number should begin appearing in the result array. Finally, the input array is scanned and each element
 * is placed in the appropriate spot in the result array. The spot in the position array for that specific
 * number is also incremented with each placement of that specific number so that the next time that number
 * is discovered in the input array it will be placed in the next available appropriate position. Note that
 * countsort should be attempted only on arrays with a range not exceeding a reasonablely low value. It is
 * not desirable to create a few million-element arrays to sort a handful of large numbers.
 *
 * EFFICIENCY:
 * Since countsort is a non-comparison based sort, it is able to acheive runtimes faster than the mathematically
 * possible limit of any comparison based sort. Countsort acheives a runtime of just O(n) versus comparison
 * based sorts such as quicksort and mergesort which have a O(n log n) runtime. Of course, for an array to
 * be a viable candidate for a countsort, the range of the elements must be known and be in a reasonablely 
 * small range (we shouldn't create arrays with a million spots just to sort a 20 item array with values up 
 * to a million).
 */
function countsort(inputArr, max){
  const range = max + 1; // because the range includes 0 to max
  const numItems = inputArr.length;
  const countArr = new Array(range).fill(0);
  const positionArr = new Array(range).fill(0);
  const resultArr = new Array(numItems);

  /**
   * countArr stores the number of times a specific integer occurs. For example countArr[2] will store
   * the number of times "2" occurs in the inputArr. countArr has one element designated for every number
   * in the range.
   */
  for(let index = 0; index < numItems; index++){
    countArr[inputArr[index]] += 1;
  }

  /**
   * positionArr has a spot corresponding to every 'number' in the range which stores the place
   * the 'number' will begin to appear in the resultArr. For example, if there are 3 "0"s in inputArr
   * then positionArr[1] will hold 3 because resultArr will stop putting "0"s and start placing "1"s
   * when it reaches resultArr[3]. If there are no "0"s in the inputArr then positionArr[1] will hold
   * 0 because resultArr should stop placing "0"s and start placing "1"s immediately.
   */
  for(let index = 1; index < range; index++){
    /**
     * positionArr[1] holds the spot in resultArr that "0"s should stop appearing. So positionArr[1]
     * will hold the place where the previous element began (in "0"'s case at spot 0) + the number
     * of times "0" appears. If "0" appears 3 times then positionArr[1] will hold 3 and resultArr[0],
     * resultArr[1], and resultArr[2] will hold "0"s and resultArr[3] will hold "1" (if there are any
     * "1"s, if there aren't any "1"s then positionArr[2] will hold 3 as well).
     */
    positionArr[index] = positionArr[index-1] + countArr[index-1];
  }


  for(let index = 0; index < numItems; index++){
    /**
     * We incrementally grab each item in the inputArr and place that number into an appropriate
     * spot in the resultArr; we then increment the element of the positionArr corresponding to
     * that number by 1 so that the next time we place an item with that number from inputArr it
     * will go into the next available appropriate spot that the number belongs.
     */
    resultArr[positionArr[inputArr[index]]] = inputArr[index];
    positionArr[inputArr[index]] += 1;
  }

  return resultArr;
}

countsort([2,2,1,2,3,2,1,2,2,4,2,4,1,2,3,2,0,0,0], 4); // => [ 0, 0, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 4, 4 ]
