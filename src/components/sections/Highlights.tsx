import { profile } from "../../data/profile";
import { Reveal } from "../ui/Reveal";
import { getStaggerDelay } from "../../lib/motion";

export function Highlights() {
  const { highlights } = profile;

  return (
    <section id="highlights" className="section-block">
      <div className="container">
        <Reveal>
          <div className="section-header">
            <h2 className="section-title">Achievements & Highlights</h2>
            <p className="section-subtitle">
              Key milestones and technical builds along my frontend journey.
            </p>
          </div>
        </Reveal>

        <div className="highlights-grid">
          {highlights.map((item, index) => {
            const isExternal = item.proofUrl?.startsWith("http");

            return (
              <Reveal
                key={item.id}
                direction="up"
                delayMs={getStaggerDelay(index)}
              >
                <article className="highlight-card">
                  <div className="highlight-meta">
                    <span className="highlight-index">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="highlight-year">{item.year}</span>
                  </div>
                  <h3 className="highlight-title">{item.title}</h3>
                  <p className="highlight-desc">{item.description}</p>
                  {item.proofUrl && (
                    <a
                      href={item.proofUrl}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                      className="highlight-link"
                    >
                      <span>{item.proofLabel || "View Proof"}</span>
                      <span aria-hidden="true">↗</span>
                    </a>
                  )}
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
