import { profile } from "../../data/profile";
import { Reveal } from "../ui/Reveal";
import { getStaggerDelay } from "../../lib/motion";

function resolvePublicPath(path?: string): string {
  if (!path) return "";
  if (/^(https?:\/\/|data:|blob:)/i.test(path)) return path;
  const cleanPath = path.replace(/^\/+/, "");
  return `${import.meta.env.BASE_URL}${cleanPath}`;
}

export function Experiments() {
  const { experiments } = profile;

  return (
    <section id="experiments" className="section-block">
      <div className="container">
        <Reveal>
          <div className="section-header">
            <h2 className="section-title">Project History</h2>
            <p className="section-subtitle">
              Project history and things being built along the way.
            </p>
          </div>
        </Reveal>

        <div className="experiments-grid">
          {experiments.map((item, index) => {
            const imageSrc = resolvePublicPath(item.image);
            const targetUrl = item.url?.trim();
            const isExternal = targetUrl ? /^https?:\/\//i.test(targetUrl) : false;

            return (
              <Reveal
                key={item.id}
                direction="up"
                delayMs={getStaggerDelay(index)}
              >
                <article className="experiment-card">
                  <div className="experiment-media">
                    {imageSrc ? (
                      <img
                        src={imageSrc}
                        alt={item.title}
                        className="experiment-image"
                      />
                    ) : (
                      <div className="experiment-thumb-fallback" aria-hidden="true">
                        <span>{item.title.slice(0, 2).toUpperCase()}</span>
                      </div>
                    )}
                  </div>

                  <div className="experiment-body">
                    <div className="experiment-top">
                      <h3 className="experiment-title">{item.title}</h3>
                      <span className="experiment-status">{item.status}</span>
                    </div>
                    <p className="experiment-desc">{item.description}</p>
                    {targetUrl && (
                      <a
                        href={targetUrl}
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noopener noreferrer" : undefined}
                        className="highlight-link"
                      >
                        <span>{item.urlLabel || "Open Live"}</span>
                        <span aria-hidden="true">↗</span>
                      </a>
                    )}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}