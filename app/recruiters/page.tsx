import type { Metadata } from "next";
import { PageHeader } from "@/components/SiteChrome";
import { RECRUITERS } from "@/lib/site-data";
import { getRecruiters } from "@/lib/Recruiters";
export const metadata: Metadata = {
  title: "Our Recruiters | TalentDuct Recruitment",
  description: "The consultants who take your brief and call the candidates.",
};

export default async function RecruitersPage() {
  const recruiters = await getRecruiters();
  return (
    <>
      <PageHeader
        eyebrow="The team"
        title="Our Recruiters"
        intro="Each consultant runs a single desk rather than covering everything, so the person who takes your brief is the person who understands the market for it. Languages are listed where they change who we can reach."
      />

      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-2 xl:grid-cols-3">
          {recruiters.map((person) => (
            <article key={person.Id} className="flex flex-col bg-card p-7">
              <h2 className="font-[family-name:var(--font-display)] text-xl font-bold tracking-tight text-ink">
                {person.Name}
              </h2>
              <p className="mt-1 text-sm text-brand">{person.Role__c}</p>
              <p className="mt-0.5 font-[family-name:var(--font-geist-mono)] text-[11px] uppercase tracking-[0.14em] text-muted">
                {person.Sector_Specialisation__c}
              </p>

              <p className="mt-4 flex-1 leading-relaxed text-body">
                Marcus Chen is a Product Designer at Nova Labs who loves
                building tools that people actually enjoy using. With over six
                years, Marcus led the redesign of Nova’s core mobile app,
                boosting user retention by 35%.
              </p>

              <dl className="mt-6 space-y-3 border-t border-line pt-4">
                <div>
                  <dt className="font-[family-name:var(--font-geist-mono)] text-[11px] uppercase tracking-[0.14em] text-muted">
                    Specialisms
                  </dt>
                  <dd className="mt-1.5 flex flex-wrap gap-1.5">
                    <span className="rounded-full bg-wash px-2.5 py-1 text-xs text-ink">
                      {person.Sector_Specialisation__c}
                    </span>
                  </dd>
                </div>

                {[
                  { term: "Office", detail: "Office" },
                  { term: "Languages", detail: "Languages" },
                  { term: "Track record", detail: "Placements" },
                  { term: "Tenure", detail: "Tenure" },
                ].map((row) => (
                  <div
                    key={row.term}
                    className="flex flex-wrap items-baseline gap-x-3"
                  >
                    <dt className="font-[family-name:var(--font-geist-mono)] text-[11px] uppercase tracking-[0.14em] text-muted">
                      {row.term}
                    </dt>
                    <dd className="text-xs text-body">{row.detail}</dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
