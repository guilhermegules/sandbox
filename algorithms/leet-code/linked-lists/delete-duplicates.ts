import { ListNode } from './list-node.ts';

function deleteDuplicates(head: ListNode | null): ListNode | null {
    let current: ListNode | null = head;
    while (current && current.next) {
        if (current.val === current.next.val) {
            current.next = current.next.next;
        } else {
            current = current.next;
        }
    }

    return head;
};

const list = new ListNode(1, new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(3)))))

console.log(deleteDuplicates(list))

const list2 = new ListNode(1, new ListNode(1, new ListNode(2)))

console.log(deleteDuplicates(list2))