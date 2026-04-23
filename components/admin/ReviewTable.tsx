"use client";

import { useEffect, useMemo, useState } from "react";
import { Review } from "@prisma/client";
import { ReviewActions } from "@/components/admin/ReviewActions";
import { formatDate } from "@/lib/utils";

type ApiPayload = {
  items: Review[];
};

export function ReviewTable() {
  const [rows, setRows] = useState<Review[]>([]);
  const [source, setSource] = useState("ALL");
  const [status, setStatus] = useState("ALL");
  const [notice, setNotice] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const query = useMemo(() => {
    const params = new URLSearchParams({ all: "1", page: "1", limit: "100" });
    if (source !== "ALL") params.set("source", source);
    if (status !== "ALL") params.set("status", status);
    return params.toString();
  }, [source, status]);

  useEffect(() => {
    let active = true;

    async function fetchRows() {
      const response = await fetch(`/api/reviews?${query}`);
      const json = (await response.json()) as ApiPayload;
      if (active) {
        setRows(json.items);
      }
    }

    fetchRows();

    return () => {
      active = false;
    };
  }, [query, refreshKey]);

  const stats = useMemo(() => {
    const total = rows.length;
    const pending = rows.filter((r) => r.status === "PENDING").length;
    const approved = rows.filter((r) => r.status === "APPROVED").length;
    const google = rows.filter((r) => r.source === "GOOGLE").length;
    const avg = rows.length ? rows.reduce((sum, item) => sum + item.rating, 0) / rows.length : 0;
    return { total, pending, approved, google, avg };
  }, [rows]);

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
        Google&apos;s API does not allow third-party apps to directly post reviews. Toggling &quot;Publish to Google&quot; will attempt the API call, but success depends on your Google My Business verification status. Reviews will always appear on this portfolio regardless.
      </div>
      {notice && <div className="rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-700">{notice}</div>}

      <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
        <Stat label="Total" value={String(stats.total)} />
        <Stat label="Pending" value={String(stats.pending)} />
        <Stat label="Approved" value={String(stats.approved)} />
        <Stat label="Google" value={String(stats.google)} />
        <Stat label="Avg Rating" value={stats.avg.toFixed(1)} />
      </div>

      <div className="flex flex-wrap gap-2">
        <select className="rounded-lg border border-slate-300 px-3 py-2 text-sm" value={source} onChange={(e) => setSource(e.target.value)}>
          <option value="ALL">All Sources</option>
          <option value="GOOGLE">Google</option>
          <option value="MANUAL">Manual</option>
        </select>
        <select className="rounded-lg border border-slate-300 px-3 py-2 text-sm" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="ALL">All Statuses</option>
          <option value="PENDING">Pending</option>
          <option value="APPROVED">Approved</option>
          <option value="REJECTED">Rejected</option>
        </select>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
        <table className="w-full min-w-[980px] text-sm">
          <thead className="bg-slate-50 text-left">
            <tr>
              <th className="px-4 py-3">Author</th>
              <th className="px-4 py-3">Rating</th>
              <th className="px-4 py-3">Source</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Publish to Google</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Review</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-t border-slate-100 align-top">
                <td className="px-4 py-3 font-medium">{row.authorName}</td>
                <td className="px-4 py-3">{row.rating}</td>
                <td className="px-4 py-3">{row.source}</td>
                <td className="px-4 py-3">{row.status}</td>
                <td className="px-4 py-3">{row.publishToGoogle ? "Yes" : "No"}</td>
                <td className="px-4 py-3">{formatDate(row.createdAt)}</td>
                <td className="max-w-[260px] px-4 py-3 text-slate-600">{row.text}</td>
                <td className="px-4 py-3">
                  <ReviewActions
                    reviewId={row.id}
                    status={row.status}
                    onDone={(message) => {
                      if (message) setNotice(message);
                      setRefreshKey((prev) => prev + 1);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-4 py-3">
      <div className="text-xs text-slate-500">{label}</div>
      <div className="text-lg font-semibold text-[var(--color-text)]">{value}</div>
    </div>
  );
}
