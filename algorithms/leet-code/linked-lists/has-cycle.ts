import { ListNode } from "./list-node.ts";

function hasCycle(head: ListNode | null): boolean {
    let fast = head;
    let slow = head;

    while (fast && fast.next) {
        slow = slow!.next;
        fast = fast.next.next;

        if (slow === fast) {
            return true;
        }
    }

    return false;
};

const list = new ListNode(1, new ListNode(3, new ListNode(0, new ListNode(-4))))

console.log(hasCycle(list));

const list2 = new ListNode(1, new ListNode(2))

console.log(hasCycle(list2));