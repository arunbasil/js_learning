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