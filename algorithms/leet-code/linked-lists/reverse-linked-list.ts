import { ListNode } from './list-node';

function reverseList(head: ListNode | null): ListNode | null {
    if (!head || !head.next) return head;

    let current: ListNode | null = head;
    let previous = null;

    while (current) {
        let temp: ListNode | null = current.next;
        current.next = previous;
        previous = current;
        current = temp;
    }

    return previous;
};

function reverseList2(head: ListNode | null): ListNode | null {
    if (!head || !head.next) return head;

    const newHead = reverseList2(head.next);
    head.next.next = head;
    head.next = null;

    return newHead;
};