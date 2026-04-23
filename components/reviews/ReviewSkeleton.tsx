export default function ReviewSkeleton() {
  return (
    <div className="h-full rounded-2xl border border-slate-200 bg-white p-5 animate-pulse">
      <div className="flex items-center justify-between gap-2">
        <div className="h-4 w-24 rounded bg-slate-200" />
        <div className="h-6 w-24 rounded-full bg-slate-200" />
      </div>

      <div className="mt-4 space-y-2">
        <div className="h-3 w-full rounded bg-slate-200" />
        <div className="h-3 w-5/6 rounded bg-slate-200" />
      </div>

      <div className="mt-6 flex items-center gap-2">
        <div className="h-6 w-6 rounded-full bg-slate-200" />
        <div className="h-3 w-24 rounded bg-slate-200" />
      </div>
    </div>
  );
}