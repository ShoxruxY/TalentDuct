import type { Metadata } from "next";
import { PageHeader, SlaBadge } from "@/components/SiteChrome";
import { getSLAs } from "@/lib1/SLAs";

export const metadata: Metadata = {
  title: "SLAs | TalentDuct Recruitment",
  description:
    "The service levels we commit to, how they are measured, and current performance.",
};

function badgeState(
  status: string | null | undefined,
): "ontrack" | "atrisk" | "breached" {
  const normalized = status
    ?.trim()
    .toLowerCase()
    .replace(/[ _-]+/g, "");
  if (normalized === "breached" || normalized === "missed") return "breached";
  if (normalized === "atrisk" || normalized === "at_risk") return "atrisk";
  return "ontrack";
}

function formatStartTime(value: string | null | undefined): string {
  if (!value) return "—";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";

  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Australia/Brisbane",
  }).format(date);
}

export default async function SlasPage() {
  const slas = await getSLAs();
  return (
    <>
      <PageHeader
        eyebrow="Service commitments"
        title="SLAs"
        intro="These are the commitments in every client agreement, with how each is measured and where we currently stand. We publish the ones we are missing as well as the ones we are meeting."
      />

      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="tabular grid gap-px overflow-hidden rounded-lg border border-line bg-line lg:grid-cols-2">
          {slas.map((sla) => (
            <article key={sla.Id} className="bg-card p-7">
              <div className="flex items-start justify-between gap-4">
                <p className="font-[family-name:var(--font-geist-mono)] text-xs text-muted">
                  {sla.SLA_ID__c}
                </p>
                <SlaBadge state={badgeState(sla.SLA_Status__c)}>
                  {sla.SLA_Status__c ?? "Unknown"}
                </SlaBadge>
              </div>

              <h2 className="mt-2 font-[family-name:var(--font-display)] text-xl font-bold tracking-tight text-ink">
                {sla.Name}
              </h2>
              <p className="mt-2 leading-relaxed text-body">
                {sla.Job_Requisition__r.Name}
              </p>

              <div className="mt-5 flex gap-8 border-y border-line py-4">
                <div>
                  <p className="font-[family-name:var(--font-geist-mono)] text-[11px] uppercase tracking-[0.14em] text-muted">
                    Target
                  </p>
                  <p className="mt-1 font-[family-name:var(--font-geist-mono)] text-lg text-ink">
                    {sla.Time_To_Fill_Target_Minutes__c != null
                      ? `${sla.Time_To_Fill_Target_Minutes__c / 1440} days`
                      : "—"}
                  </p>
                </div>
                <div>
                  <p className="font-[family-name:var(--font-geist-mono)] text-[11px] uppercase tracking-[0.14em] text-muted">
                    Shortlist Target
                  </p>
                  <p className="mt-1 font-[family-name:var(--font-geist-mono)] text-lg text-ink">
                    {sla.Shortlist_Delivery_Target_Minutes__c != null
                      ? `${Math.round(sla.Shortlist_Delivery_Target_Minutes__c / 1440)} days`
                      : "—"}
                  </p>
                </div>
              </div>

              <dl className="mt-4 space-y-2">
                <div>
                  <dt className="font-[family-name:var(--font-geist-mono)] text-[11px] uppercase tracking-[0.14em] text-muted">
                    Started
                  </dt>
                  <dd className="mt-1 text-sm text-body">
                    {formatStartTime(sla.Start_Time__c)}
                  </dd>
                </div>
                <div>
                  <dt className="font-[family-name:var(--font-geist-mono)] text-[11px] uppercase tracking-[0.14em] text-muted">
                    Elapsed days
                  </dt>
                  <dd className="mt-1 text-sm text-body">
                    {sla.Elapsed_Minutes__c != null
                      ? `${Math.round(sla.Elapsed_Minutes__c / 1440)} days`
                      : "—"}
                  </dd>
                </div>
              </dl>
            </article>
          ))}
          {slas.length === 0 && (
            <p className="bg-card p-7 text-body lg:col-span-2">
              SLA information is temporarily unavailable.
            </p>
          )}
        </div>

        <div className="mt-10 rounded-lg border border-line bg-wash p-6">
          <h2 className="font-[family-name:var(--font-display)] text-lg font-bold text-ink">
            If we miss a commitment
          </h2>
          <p className="mt-2 max-w-2xl leading-relaxed text-body">
            Raise it through the assistant on this page. Lodging it there
            creates a case against your account, which means it is tracked and
            reportable rather than sitting in someone inbox. We respond within
            one business day with the measured timeline and what we are doing
            about it.
          </p>
        </div>
      </div>
    </>
  );
}
