import { useState } from "react";
import { profile, type Moment, type MomentCategory } from "../../data/profile";
import { Reveal } from "../ui/Reveal";
import { getStaggerDelay } from "../../lib/motion";

type FilterOption = "all" | MomentCategory;

function resolvePublicPath(path?: string): string {
  if (!path) return "";
  if (/^(https?:\/\/|data:|blob:)/i.test(path)) return path;
  const cleanPath = path.replace(/^\/+/, "");
  return `${import.meta.env.BASE_URL}${cleanPath}`;
}

function MomentCard({ moment, delayMs }: { moment: Moment; delayMs: number }) {
  const [imgError, setImgError] = useState(false);
  const imgSrc = resolvePublicPath(moment.image);

  return (
    <Reveal direction="up" delayMs={delayMs}>
      <article className="moment-card">
        <div className="moment-media">
          {!imgError && imgSrc ? (
            <img
              src={imgSrc}
              alt={moment.title}
              className="moment-image"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="moment-fallback">{moment.title}</div>
          )}
        </div>

        <div className="moment-body">
          <div className="moment-top">
            <h4 className="moment-title">{moment.title}</h4>
            <span className="moment-category">{moment.category}</span>
          </div>
          <p className="moment-caption">{moment.caption}</p>
        </div>
      </article>
    </Reveal>
  );
}

export function Interests() {
  const { hobbies, moments } = profile;
  const [activeFilter, setActiveFilter] = useState<FilterOption>("all");

  const filteredMoments =
    activeFilter === "all"
      ? moments
      : moments.filter((item) => item.category === activeFilter);

  const filterOptions: { key: FilterOption; label: string; count: number }[] = [
    { key: "all", label: "All", count: moments.length },
    {
      key: "nature",
      label: "Nature",
      count: moments.filter((item) => item.category === "nature").length,
    },
    {
      key: "city",
      label: "City",
      count: moments.filter((item) => item.category === "city").length,
    },
  ];

  return (
    <section id="interests" className="section-block">
      <div className="container">
        <Reveal>
          <div className="section-header">
            <h2 className="section-title">What I Do Outside Coding</h2>
            <p className="section-subtitle">
              Everyday routines, stories, and snapshots across nature and the city.
            </p>
          </div>
        </Reveal>

        <div className="hobbies-strip">
          <div className="hobby-grid-minimal">
            {hobbies.map((hobby, index) => (
              <Reveal
                key={hobby.id}
                direction="up"
                delayMs={getStaggerDelay(index)}
              >
                <article className="hobby-card">
                  <div>
                    <h4 className="hobby-name">{hobby.name}</h4>
                    {hobby.description && (
                      <p className="hobby-desc">{hobby.description}</p>
                    )}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="moments-block">
          <Reveal delayMs={getStaggerDelay(1)}>
            <div className="moments-header-row">
              <h3 className="subsection-title" style={{ margin: 0 }}>
                Snapshots
              </h3>

              <div className="moment-filter-bar" role="tablist" aria-label="Filter moments">
                {filterOptions.map((option) => {
                  const isActive = activeFilter === option.key;
                  return (
                    <button
                      key={option.key}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveFilter(option.key)}
                      className={`filter-pill ${isActive ? "is-active" : ""}`}
                    >
                      <span>{option.label}</span>
                      <span className="filter-count">{option.count}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </Reveal>

          <div key={activeFilter} className="moments-grid skills-grid-enter">
            {filteredMoments.map((moment, index) => (
              <MomentCard
                key={moment.id}
                moment={moment}
                delayMs={getStaggerDelay(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
