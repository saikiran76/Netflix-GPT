// function removeElement(arr, val){
//     let i = 0;
//     for(let j = 0; j<arr.length; j++){
//         if(arr[j] !== val){
//             arr[i] = arr[j];
//             i++;
//         }
//     }
//     return i;
// }

// const arr = [1, 2, 3, 4];
// const sliceIndex = removeElement(arr, 2) 
// console.log("the returned slice index: ", sliceIndex)
// console.log(arr.slice(0, sliceIndex));

// function twoSum(arr, target) {
//     const numObj = {};
//     for(let i=0; i<arr.length; i++){
//         const num = arr[i];
//         const complement = target - num;

//         if(numObj.hasOwnProperty(complement)){
//             return [numObj[complement], i]
//         }

//         numObj[num] = i
//     }

//     return []
// }

// const nums = [5, 5, 3, 5];
// const target = 10;

// console.log(twoSum(nums, target))


function findDuplicates(arr){
    const duplicates = []
    const duplicatesObj = {};
    for (let num of arr){
        duplicatesObj[num] = (duplicatesObj[num] || 0) + 1;
    }
    for(let key in duplicatesObj){
        if(duplicatesObj[key] > 1){
            duplicates.push(key)
        } 

    }

    return [duplicates, duplicatesObj]
}

const arr = [1, 2, 3, 4, 5, 5, 6, 7, 8]
console.log(findDuplicates(arr))


