import { ListNode } from "./list-node.ts";

function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
    const mergedList = new ListNode(0);
    let current = mergedList;

    while (list1 && list2) {
        if (list1.val < list2.val) {
            current.next = list1;
            list1 = list1.next;
        } else {
            current.next = list2;
            list2 = list2.next;
        }

        current = current.next;
    }

    current.next = list1 ? list1 : list2;

    return mergedList.next;
};

const list1 = new ListNode(1, new ListNode(2, new ListNode(4)))
const list2 = new ListNode(1, new ListNode(3, new ListNode(4)))

console.log(mergeTwoLists(list1, list2));