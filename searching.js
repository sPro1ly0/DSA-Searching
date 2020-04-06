// 1. How many searches?
/*Given a sorted list 3, 5, 6, 8, 11, 12, 14, 15, 17, 18 
and using the recursive binary search algorithm,
identify the sequence of numbers that each recursive call 
will search to try and find 8.

find 16. */

function binarySearch(array, value, start, end) {
    var start = start === undefined ? 0 : start;
    var end = end === undefined ? array.length : end;

    if (start > end) {
        return -1;
    }

    const index = Math.floor((start + end) / 2);
    const item = array[index];

    console.log(start, end);
    if (item == value) {
        return index;
    } else if (item < value) {
        return binarySearch(array, value, index + 1, end);
    } else if (item > value) {
        return binarySearch(array, value, start, index - 1);
    }

}

let numbers = [3, 5, 6, 8, 11, 12, 14, 15, 17, 18];
let value1 = 8;
let value2 = 16;

console.log(binarySearch(numbers, value1));
// 1. [3, 5, 6, 8, 11] index 0 - 4
// 2. [8, 11] index 3 - 4
// 3. [8] index 3
console.log(binarySearch(numbers, value2));
// 1. [12, 14, 15, 17, 18] index 6 - 9
// 2. [12, 14] index 6 - 7
// 3. [14] index 7
// 4. index 8 - 7 ----> -1

// 2. Adding a React UI