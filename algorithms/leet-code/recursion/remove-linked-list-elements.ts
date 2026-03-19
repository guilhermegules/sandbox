import { ListNode } from "../linked-lists/list-node.ts";

function removeElements(head: ListNode | null, val: number): ListNode | null {
  const r = (head: ListNode | null, val: number): ListNode | null => {
    if (!head) return null;

    head.next = r(head.next, val);

    if (head.val === val) return head.next;

    return head;
  };

  return r(head, val);
}

function removeElements2(head: ListNode | null, val: number): ListNode | null {
  if (!head) return null;

  head.next = removeElements2(head.next, val);

  if (head.val === val) return head.next;

  return head;
}

console.log(
  removeElements(
    new ListNode(
      1,
      new ListNode(
        2,
        new ListNode(
          6,
          new ListNode(3, new ListNode(4, new ListNode(5, new ListNode(6)))),
        ),
      ),
    ),
    6,
  ),
);
