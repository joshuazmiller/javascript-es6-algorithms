/**
 * Maximum-subarray problem
 * Goal: Given an array of numbers find the subarray with the largest sum.
 * Source: Section 4.1 in Introduction to Algorithms (3ed)
 */

/**
 * Iterative solution.
 * This runs in O(n).
 * This is given as exercise 4.1-5
 */

private findMaxSubArrayIterative(A, low, high) {
    let suffixes = [];

    suffixes[0] = {};
    suffixes[0].left = low;
    suffixes[0].right = low + 1;
    suffixes[0].sum = A[low];

    for (let i = low + 1; i < high; i++) {
        suffixes[i] = {};
        if (suffixes[i - 1].sum < 0) {
            suffixes[i].left = i;
            suffixes[i].right = i + 1;
            suffixes[i].sum = A[i];
        } else {
            let previous = suffixes[i - 1];
            suffixes[i].left = previous.left;
            suffixes[i].right = i + 1;
            suffixes[i].sum = previous.sum + A[i];
        }
    }

    let max = suffixes[0];
    for (let i = low + 1; i < high; i++) {
        if (max.sum < suffixes[i].sum) {
            max = suffixes[i];
        }
    }

    return max;
}

/**
 * Recursive solution.
 * This runs in O(n lg n).
 * This is given as exercise 4.1-3
 */

private findMaxSubArrayRecursive(A, low, high) {
    let leftLow, leftHigh, leftSum, rightLow, rightHigh, rightSum, crossLow, crossHigh, crossSum;
    if (high === low) {
        return [low, high, A[low]];
    } else {
        let mid = Math.floor((low + high) / 2);
        [leftLow, leftHigh, leftSum] = this.findMaxSubArrayRecursive(A, low, mid);
        [rightLow, rightHigh, rightSum] = this.findMaxSubArrayRecursive(A, mid + 1, high);
        [crossLow, crossHigh, crossSum] = this.findMaxCrossingSubArray(A, low, mid, high);
        if (leftSum >= rightSum && leftSum >= crossSum) {
            return [leftLow, leftHigh, leftSum];
        } else if (rightSum >= leftSum && rightSum >= crossSum) {
            return [rightLow, rightHigh, rightSum];
        } else {
            return [crossLow, crossHigh, crossSum];
        }
    }
}

private findMaxCrossingSubArray(A, low, mid, high) {
    let maxLeft, maxRight, sum;
    let leftSum = Number.NEGATIVE_INFINITY;
    let rightSum = Number.NEGATIVE_INFINITY;
    sum = 0;
    for (let i = mid; i >= low; i--) {
        sum = sum + A[i];
        if (sum > leftSum) {
            leftSum = sum;
            maxLeft = i;
        }
    }
    sum = 0;
    for (let j = mid + 1; j <= high; j++) {
        sum = sum + A[j];
        if (sum > rightSum) {
            rightSum = sum;
            maxRight = j;
        }
    }
    return [maxLeft, maxRight, leftSum + rightSum];
}

const A = [13, -3, -25, 20, -3, -16, -23, 18, 20, -7, 12, -5, -22, 15, -4, 7];
const low = 0;
const high = A.length;
const result = findMaxSubArrayIterative(A, low, high);
console.log(result); // {left: 7, right: 11, sum: 43}
