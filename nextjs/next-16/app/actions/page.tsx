import { sayHello } from "@/actions/say-hello";
import ActionsForm from "@/components/actions-form";

export default function ActionsPage() {
  return <ActionsForm action={sayHello} />;
}
