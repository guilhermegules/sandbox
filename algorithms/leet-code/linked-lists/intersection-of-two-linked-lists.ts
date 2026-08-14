import { ListNode } from "./list-node.ts";

function getIntersectionNode(headA: ListNode | null, headB: ListNode | null): ListNode | null {
    let pA = headA;
    let pB = headB;

    while (pA !== pB) {
        pA = pA ? pA.next : headB;
        pB = pB ? pB.next : headA;
    }

    return pA ?? pB;
};

const intersection = new ListNode(8, new ListNode(4, new ListNode(5)));
console.log(getIntersectionNode(new ListNode(4, new ListNode(1, intersection)), new ListNode(5, new ListNode(6, new ListNode(1, intersection)))))