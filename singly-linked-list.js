/**
 * The operations that can be performed on a singly-linked list include:
 * 1. pushFront(key) which takes O(1) time and involves updating the head pointer to point to the new element.
 * 2. topFront() which takes O(1) time and involves returning the value of the element pointed to by the head.
 * 3. popFront() takes O(1) time and involves returning the value pointed to by the head and updating the head to point to the 
 * next element.
 * 4. pushBack(key) takes O(n) time in the case of no tail pointer or else O(1) time with a tail pointer. It involves updating the last
 * element to point to the new element and then updating the tail pointer to point to the new element.
 * 5. topBack() which takes O(n) time in the case of no tail pointer or else O(1) time with a tail pointer. It involves returning the
 * value of the item pointed to by the tail pointer.
 * 6. popBack() takes O(n) time. It involves moving through the array left-to-right until reaching the second to last element and then 
 * updating the tail to reference that element, and setting that element's next pointer to nil.
 * 7. find(key) takes O(n) time. It involves moving through the array left-to-right until finding that key.
 * 8. erase(key) takes O(n) time. It involves moving through the array left-to-right until finding the element that points to that
 * key and updating its next pointer to the key's next pointer thereby cutting out the key element.
 * 9. empty() takes O(1) time. Simply check if the head pointer is set to nil.
 * 10. addBefore(node, key) takes O(n) time. The array must be transversed left-to-right until finding the element that points to the
 * key. Then update that element to point to the new node and the new node to point to the key.
 * 11. addAfter(node, key) takes O(1) time assuming the key is already located otherwise searching for the key itself takes O(n) time. 
 * It involves transversing the list left-to-right until finding the key and then updating the key's next pointer to point to the new 
 * node and the new node's next pointer to point to the key's next pointer's value. If the new node is now the tail then the tail must 
 * also be updated.
 */
