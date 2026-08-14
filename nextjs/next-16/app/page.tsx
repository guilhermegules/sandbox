import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="flex flex-col">
        <Link href={"actions"}>Actions</Link>
        <Link href={"cache-components"}>Cache Components</Link>
        <Link href={"client-components"}>Client Components</Link>
        <Link href={"server-components"}>Server Components</Link>
      </div>
    </div>
  );
}
