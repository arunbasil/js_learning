let fruits = ['apple', 'banana', 'orange'];

for (i = 0; i <fruits.length; i++) {console.log(fruits[i])};

// fruits.forEach(function(fruit) {
//     console.log(fruit);
// });

// fruits.forEach(fruits => console.log(fruits));


//WRITE A FUNCTIN FOR GIVEN AN ARRAY OF NUMBERS, FIND THE TWO NUMBERS THAT MATCHES THE GIVEN NUMBER

// function twoNumberSum(arr, num) {
//     for (let i = 0; i < arr.length; i++) {
//         for (let j = i + 1; j < arr.length; j++) {
//             if (arr[i] + arr[j] === num) {
//                 return [arr[i], arr[j]];
//             }
//         }
//     }
// }
const numberFinder = {
    findTwoNumbers: function(nums, target, callback) {
        let numObject = {};
        for (let i = 0; i < nums.length; i++) {
            let complement = target - nums[i];
            if (numObject[complement] !== undefined) {
                // If the pair is found, execute the callback with the two numbers
                return callback(complement, nums[i]);
            }
            numObject[nums[i]] = i;
        }
        return []; // Return an empty array if no pair is found
    }
};
function multiplyNumbers(num1, num2) {
    return num1 * num2;
}
function subtractNumbers(num1, num2) {
    return num1 - num2;
}
// Example usage:
let numbers = [2, 7, 11, 15];
let target = 9;
console.log(numberFinder.findTwoNumbers(numbers, target, subtractNumbers)); // Outputs: 14 (2 * 7)





