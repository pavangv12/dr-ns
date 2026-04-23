"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function ReviewActions({
  reviewId,
  status,
  onDone,
}: {
  reviewId: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  onDone: (message?: string) => void;
}) {
  const [loading, setLoading] = useState(false);

  async function runAction(payload: Record<string, unknown>) {
    setLoading(true);
    const response = await fetch(`/api/reviews/${reviewId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const json = await response.json();
    setLoading(false);
    onDone(json.gmbMessage);
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button size="sm" onClick={() => runAction({ status: "APPROVED" })} disabled={loading || status === "APPROVED"}>
        Approve
      </Button>
      <Button size="sm" variant="secondary" onClick={() => runAction({ status: "REJECTED" })} disabled={loading || status === "REJECTED"}>
        Reject
      </Button>
      <Button size="sm" variant="ghost" onClick={() => runAction({ publishToGoogle: true })} disabled={loading}>
        Publish to Google
      </Button>
      <Button size="sm" variant="ghost" onClick={() => runAction({ publishToGoogle: false })} disabled={loading}>
        Unpublish Toggle
      </Button>
    </div>
  );
}
