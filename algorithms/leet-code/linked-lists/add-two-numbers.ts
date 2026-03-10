import { ListNode } from "./list-node.ts";

function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
    let newList = new ListNode(0);
    let current = newList;
    let carry = 0;

    while (l1 || l2 || carry) {
        let sum = carry;

        if (l1) {
            sum += l1.val;
            l1 = l1.next;
        }

        if (l2) {
            sum += l2.val;
            l2 = l2.next;
        }

        carry = Math.floor(sum / 10);
        current.next = new ListNode(Math.floor(sum % 10));
        current = current.next;
    }

    return newList.next;
};

// You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.
// You may assume the two numbers do not contain any leading zero, except the number 0 itself.
function addTwoNumbers2(l1: ListNode | null, l2: ListNode | null): ListNode | null {
    const newList = new ListNode();
    let current = newList;
    let leadingValue = 0;

    while (l1 || l2) {
        let sum = leadingValue;

        if (l1) {
            sum += l1.val;
            l1 = l1.next;
        }

        if (l2) {
            sum += l2.val;
            l2 = l2.next;
        }

        leadingValue = Math.floor(sum / 10)
        current.next = new ListNode(Math.floor(sum % 10));
        current = current.next;
    }

    return newList.next;
};

const list1 = new ListNode(2, new ListNode(4, new ListNode(3)))
const list2 = new ListNode(5, new ListNode(6, new ListNode(4)))

console.log(addTwoNumbers2(list1, list2));