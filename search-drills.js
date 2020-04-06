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

// console.log(binarySearch(numbers, value1));
// 1. [3, 5, 6, 8, 11] index 0 - 4
// 2. [8, 11] index 3 - 4
// 3. [8] index 3
// console.log(binarySearch(numbers, value2));
// 1. [12, 14, 15, 17, 18] index 6 - 9
// 2. [12, 14] index 6 - 7
// 3. [14] index 7
// 4. index 8 - 7 ----> -1

// 2. Adding a React UI

// 3. Find a Book 
// Imagine you are looking for a book in a library with a Dewey Decimal index.
// How would you go about it? Can you express this process
// as a search algorithm? Implement your algorithm to find
// a book whose Dewey and book title is provided.

const library = [
    {dewey: 0, title: ['Test']},
    {dewey: 1, title: ['Panda', 'Bear']},
    {dewey: 2, title: ['Rainbow', 'Storms']},
    {dewey: 3, title: ['Sky']},
    {dewey: 4, title: ['Land', 'Ocean']},
    {dewey: 5, title: ['Moon', 'Stars', 'Night']},
    {dewey: 6, title: ['Trees', 'Forest']},
    {dewey: 7, title: ['Art']},
    {dewey: 8, title: ['Comedy', 'Funny']},
    {dewey: 9, title: ['Final Book']},
];

function deweyBookSearch(array, value, bookTitle, start, end) {
    var start = start === undefined ? 0 : start;
    var end = end === undefined ? array.length : end;

    if (start > end) {
        return -1;
    }

    const index = Math.floor((start + end) / 2);
    const item = array[index].dewey;

    if (item == value) {
        if (array[index].title.includes(bookTitle)) {
            return `Your book '${bookTitle}' is found.`;
        } else {
            return `That book is not available.`;
        }
    } else if (item < value) {
        return deweyBookSearch(array, value, bookTitle, index + 1, end);
    } else if (item > value) {
        return deweyBookSearch(array, value, bookTitle, start, index - 1);
    }

}

// console.log(deweyBookSearch(library, 5, 'Moon'));
// console.log(deweyBookSearch(library, 9, 'Final')); // That book is not available.

/* 4 Searching in a BST
1) Given a binary search tree whose in-order and pre-order 
traversals are respectively 14 15 19 25 27 35 79 89 90 91 and 
35 25 15 14 19 27 89 79 91 90. What would be its postorder 
traversal?

Postorder: 14, 19, 15, 27, 25, 79, 90, 91, 89, 35

2) The post order traversal of a binary search tree 
is 5 7 6 9 11 10 8. What is its pre-order traversal?

Preorder: 8, 6, 5, 7, 10, 9, 11
 
 */

 // 5. Implement different tree traversals

 class BinarySearchTree {
    // represents a single node in the tree
    constructor(key = null, value = null, parent = null) {
        this.key = key; // if key = null, then object represents empty tree
        this.value = value;
        this.parent = parent; // each node has a parent except for root node
        this.left = null; // point to left child node
        this.right = null; // point to right child 
        // node starts with left and right pointers to their children being null
    }
    // bst support insert, remove, and find
    insert(key, value) {
        // tree is empty, set root node
        if (this.key == null) {
            this.key = key;
            this.value = value
        } else if (key < this.key) { // left branch
            /* If the existing node does not have a left child, 
               meaning that if the `left` pointer is empty, 
               then we can just instantiate and insert the new node 
               as the left child of that node, passing `this` as the parent */
            if (this.left == null) {
                this.left = new BinarySearchTree(key, value, this);
            } else {
                /* If the node has an existing left child, 
               then we recursively call the `insert` method 
               so the node is added further down the tree */
                this.left.insert(key, value);
            }
        } else { // right branch
            if (this.right == null) {
                this.right = new BinarySearchTree(key, value, this);
            } else {
                this.right.insert(key, value);
            }
        }
    }

    find(key) {
        // if key is equal to the root
        if (this.key === key) {
            return this.value;
        } else if (key < this.key && this.left) {
           /* If the item you are looking for is less than the root 
           then follow the left child.
           If there is an existing left child, 
           then recursively check its left and/or right child
           until you find the item */
            return this.left.find(key);
        } else if (key > this.key && this.right) {
            return this.right.find(key);
        } else {
            throw new Error('Key Error');
        }
    }

    remove(key) {
        if (this.key == key) {
            if (this.left && this.right) {
                const successor = this.right._findMin();
                this.key = successor.key;
                this.value = successor.value;
                successor.remove(successor.key);
            } else if (this.left) {
                this._replaceWith(this.left);
            } else if (this.right) {
                this._replaceWith(this.right);
            } else {
                this._replaceWith(null);
            }
        } else if (key < this.key && this.left) {
            this.left.remove(key);
        } else if (key > this.key && this.right) {
            this.right.remove(key);
        } else {
            throw new Error('Key Error');
        }
    }

    _replaceWith(node) {
        if (this.parent) {
            if (this == this.parent.left) {
                this.parent.left = node
            } else if (this == this.parent.right) {
                this.parent.right = node;
            }

            if (node) {
                node.parent = this.parent;
            }
        } else {
            if (node) {
                this.key = node.key;
                this.value = node.value;
                this.left = node.left;
                this.right = node.right;
            } else {
                this.key = null;
                this.value = null;
                this.left = null;
                this.right = null;
            }
        }
    }

    _findMin() {
        if (!this.left) {
            return this;
        }
        return this.left._findMin();
    }
}

let tree = new BinarySearchTree();
let data = [25, 15, 50, 10, 24, 35, 70, 4, 12, 18, 31, 44, 66, 90, 22];
data.forEach(item => tree.insert(item, item));
let result = [];
// left, parent, right
function inOrder(t) {
    if(t.left) {
        inOrder(t.left);
    }

    result.push(t.key);

    if(t.right) {
        inOrder(t.right);
    }

    return result;
}
// console.log(inOrder(tree)); // 4, 10, 12, 15, 18, 22, 24, 25, 31, 35, 44, 50, 66, 70, 90

// parent, left, right
function preOrder(t) {
    result.push(t.key);

    if(t.left) {
        preOrder(t.left);
    }

    if(t.right) {
        preOrder(t.right);
    }

    return result;
}
// console.log(preOrder(tree)); // 25, 15, 10, 4, 12, 24, 18, 22, 50, 35, 31, 44, 70, 66, 90

// left, right, parent
function postOrder(t) {
    if (t.left) {
        postOrder(t.left)
    }

    if (t.right) {
        postOrder(t.right)
    }

    result.push(t.key);
    return result;
}

// console.log(postOrder(tree)); // 4, 12, 10, 22, 18, 24, 15, 31, 44, 35, 66, 90, 70, 50, 25

// 6. Find the next commanding officer
// Breadth-first search, works across the rows of trees
// Need a queue w/ FIFO
// order Captain Picard, Commander Riker, Commander Data, Lt. Cmdr. Worf, Lt. Cmdr. LaForge, Lt. Cmdr. Crusher, Lieutenant security-officer, Lieutenant Selar

class _Node {
    constructor(value, next) {
        this.value = value;
        this.next = null;
    }
}

class Queue {
    constructor() {
        this.first = null;
        this.last = null;
    }

    enqueue(value) {
        const node = new _Node(value);

        if (this.first === null) {
            this.first = node;
        }

        if (this.last) {
            this.last.next = node;
        }
        
        this.last = node;
    }

    dequeue() {
        if (this.first === null) {
            return;
        }

        const node = this.first;
        this.first = this.first.next;

        if (this.last === node) {
            this.last = null;
        }

        return node.value;
    }
}

const rankOfCommand = new BinarySearchTree();
rankOfCommand.insert(5, 'Captain Picard');
rankOfCommand.insert(6, 'Commander Data');
rankOfCommand.insert(3, 'Commander Riker');
rankOfCommand.insert(2, 'Lt. Cmdr. Worf');
rankOfCommand.insert(4, 'Lt. Cmdr. LaForge');
rankOfCommand.insert(8, 'Lt. Cmdr. Crusher');
rankOfCommand.insert(1, 'Lieutenant security-officer');
rankOfCommand.insert(7, 'Lieutenant Selar');

function listOfficers(tree, result = []) {
    const queue = new Queue();
    const t = tree;
    // console.log(t);
    queue.enqueue(t);
  
    while(queue.first) {
      const node = queue.dequeue();
      result.push(node.value);
        
      // left more experience, higher rank, enqueue first
      if (node.left) {
        queue.enqueue(node.left);
      }
      // lower rank enqueue last
      if (node.right) {
        queue.enqueue(node.right);
      }
    }
  
    return result;
}
  
// console.log(listOfficers(rankOfCommand));

// 7. Max Profit

function maxProfit(list) {
    let profit = 0;

    for (let i = 0; i < list.length; i++) {
        if (list[i] < list[i + 1]) {
            profit += (list[i + 1] - list[i]);
        }
    }

    return profit;
}

let shares = [128, 97, 121, 123, 98, 97, 105];
// console.log(maxProfit(shares)); // 34

function eggDrop() {
    let f = 1;
    while (f*(f + 1) / 2 < 100) {
      f++;
    }

    let floor = f;
    let count = 0;
  
    while (floor <= 100) {
      console.log(`Drop ${count + 1} at floor ${floor}`);
      count++;
      floor += f - count
    }

    if (floor > 100) console.log(`Drop ${count + 1} at floor 100`);
}
  
eggDrop();