/**
 * The items are pre-sorted with the highest value/weight ratios first in descending order (the most
 * valuable items in descending order). Without pre-sorting, this function would run O(n^2) because
 * we'd need to do an inner loop finding the next most valuable item. With pre-sorting with Quicksort
 * or Mergesort you can get O(n log n) because our function would just be O(n) as in this example.
 */
function knapsackGreedy(capacity, itemsArr){
  let totalValue = 0;

  // Each element of the quantitiesArr stores the final quantity of the item in in the
  // coresponding index of the itemsArr
  let quantitiesArr = [];

  // We will fill the array with 0's so that trailing items that are not included in the knapsack
  // will still be represented in the quantities array.
  for(const item of itemsArr){
    quantitiesArr.push(0);
  }

  let index = 0;
  for(const item of itemsArr){
    if(capacity === 0) {  // knapsack is full
      return [totalValue, quantitiesArr];
    }
    // We include the maximum of the currently most valuable item that will still fit in the knapsack.
    const numberOfUnits = Math.min(item.weight, capacity);

    quantitiesArr[index] = numberOfUnits;
    totalValue += numberOfUnits * item.value / item.weight;
    item.weight -= numberOfUnits;
    capacity -= numberOfUnits;
    index++;
  }
  return [totalValue, quantitiesArr];
}

// Each unit of weight corresponds to a unit that can be included or excluded from the knapsack.
// Note that the items are sorted with the highest value/weight ratios first in descending order.
knapsackGreedy(7, [{value:14, weight: 2},{value:18, weight: 3},{value:20, weight: 4},{value:20, weight: 10}]); // $42
