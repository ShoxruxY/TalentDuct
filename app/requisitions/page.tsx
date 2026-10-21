import type { Metadata } from "next";
import { PageHeader, SlaBadge } from "@/components/SiteChrome";
import { getJobRequisitions, getClientMap } from "@/lib/Job-Requisitions.ts";

export const metadata: Metadata = {
  title: "Job Requisitions | TalentDuct Recruitment",
  description: "Open roles across technology, security and corporate services.",
};

function badgeState(
  status: string | null | undefined,
): "ontrack" | "atrisk" | "breached" {
  const normalized = status
    ?.trim()
    .toLowerCase()
    .replace(/[ _-]+/g, "");
  if (
    normalized === "breached" ||
    normalized === "closed" ||
    normalized === "cancelled"
  ) {
    return "breached";
  }
  if (normalized === "atrisk" || normalized === "delayed") return "atrisk";
  return "ontrack";
}

export default async function RequisitionsPage() {
  const requisitions = await getJobRequisitions();

  return (
    <>
      <PageHeader
        eyebrow="Open roles"
        title="Job Requisitions"
        intro="Every open requisition, with how long it has been running and whether it is inside the agreed time to fill. Roles are shown with the client anonymised until shortlist stage."
      />

      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="tabular grid gap-px overflow-hidden rounded-lg border border-line bg-line">
          {requisitions.map((req) => (
            <article
              key={req.Job_Requisition__r?.Requisition_Number__c}
              className="bg-card p-7"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-[family-name:var(--font-geist-mono)] text-xs text-muted">
                    {req.Job_Requisition__r.Requisition_Number__c}
                  </p>
                  <h2 className="mt-1 font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-ink">
                    {req.Job_Requisition__r.Job_Title__c}
                  </h2>
                  <p className="mt-1 text-sm text-body">
                    Confidential recruiter ·{" "}
                    {req.Job_Requisition__r?.Location__c ??
                      "Location not specified"}
                  </p>
                </div>

                <div className="text-right">
                  <SlaBadge state={badgeState(req.SLA_Status__c)}>
                    {req.SLA_Status__c ?? "Status unavailable"}
                  </SlaBadge>
                  <p className="mt-1 font-[family-name:var(--font-geist-mono)] text-xs text-muted">
                    day {Math.round(req.Elapsed_Minutes__c / 1440)} of{" "}
                    {req.Time_To_Fill_Target_Minutes__c / 1440}
                  </p>
                </div>
              </div>

              <p className="mt-4 max-w-2xl leading-relaxed text-body">
                {req.Job_Requisition__r?.Description__c ??
                  "Details available on request."}
              </p>

              <dl className="mt-6 grid gap-x-8 gap-y-3 border-t border-line pt-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    term: "Employment",
                    detail: req.Job_Requisition__r?.Employment_Type__c ?? "—",
                  },
                  {
                    term: "Package",
                    detail: req.Job_Requisition__r?.Salary_Range__c ?? "—",
                  },
                  {
                    term: "Stage",
                    detail: req.Job_Requisition__r.Status__c ?? "—",
                  },
                  {
                    term: "Consultant",
                    detail: "Consultant",
                  },
                ].map((row) => (
                  <div key={row.term}>
                    <dt className="font-[family-name:var(--font-geist-mono)] text-[11px] uppercase tracking-[0.14em] text-muted">
                      {row.term}
                    </dt>
                    <dd className="mt-1 text-sm text-ink">{row.detail}</dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
          {requisitions.length === 0 && (
            <p className="bg-card p-7 text-body">
              No open requisitions are available right now.
            </p>
          )}
        </div>

        <p className="mt-8 text-sm text-muted">
          Cannot see a role that fits? Ask the assistant in the corner of this
          page and we will log an enquiry against your details.
        </p>
      </div>
    </>
  );
}
