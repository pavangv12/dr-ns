import Link from "next/link";
import { auth, signOut } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session) {
    // Keep login route accessible; middleware already guards protected admin pages.
    return <>{children}</>;
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 md:px-6">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-serif text-3xl font-semibold">Admin Dashboard</h1>
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/admin/login" });
          }}
        >
          <button className="rounded-xl border border-slate-300 px-4 py-2 text-sm" type="submit">
            Sign Out
          </button>
        </form>
      </div>
      <div className="mb-6 flex gap-3 text-sm">
        <Link href="/admin" className="rounded-lg bg-white px-3 py-2 border border-slate-200">Overview</Link>
        <Link href="/admin/reviews" className="rounded-lg bg-white px-3 py-2 border border-slate-200">Manage Reviews</Link>
      </div>
      {children}
    </div>
  );
}
