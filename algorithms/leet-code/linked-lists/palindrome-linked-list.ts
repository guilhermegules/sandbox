// Time O(n) space O(1)
function isPalindrome(head: ListNode | null): boolean {
    if (!head || !head.next) {
        return true;
    }

    let slow: ListNode  | null = head;
    let fast: ListNode | null = head;

    while (fast && fast.next) {
        slow = slow!.next;
        fast = fast.next.next;
    }

    let prev: ListNode | null = null;
    let curr: ListNode | null = slow;

    while (curr) {
        let nextTmp = curr.next;
        curr.next = prev;
        prev = curr;
        curr = nextTmp;
    }

    let left: ListNode | null = head;
    let right: ListNode | null = prev;

    while (right) {
        if (left!.val !== right.val) {
            return false;
        }

        left = left!.next;
        right = right.next;
    }

    return true;
};

// Time and Space O(n)
function isPalindrome2(head: ListNode | null): boolean {
    let arr: number[] = [];
    let curr = head;

    while (curr) {
        arr.push(curr.val);
        curr = curr.next;
    }

    let left = 0, right = arr.length - 1;
    while (left < right) {
        if (arr[left] !== arr[right]) return false;
        left++;
        right--;
    }

    return true;
};

// Time and Space O(n)
function isPalindrome3(head: ListNode | null): boolean {
    let left: ListNode | null = head;

    function traverse(right: ListNode | null): boolean {
        if (!right) return true;

        let res = traverse(right.next);
        if (!res) return false;

        if (left!.val !== right.val) return false;
        left = left!.next;

        return true;
    }

    return traverse(head);
};
