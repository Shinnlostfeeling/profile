import { formatDate, getAge, profile } from "../../data/profile";
import { Reveal } from "../ui/Reveal";
import { getStaggerDelay } from "../../lib/motion";

export function About() {
  const { identity, dates, bio, currentFocus } = profile;
  const age = getAge(dates.birthDate);

  const infoItems = [
    { label: "Nickname", value: identity.nickname },
    { label: "Age", value: `${age} ${age === 1 ? "year old" : "years old"}` },
    { label: "Birth Date", value: formatDate(dates.birthDate) },
    { label: "Location", value: identity.location },
    { label: "Active Since", value: formatDate(dates.activeSince) },
    { label: "Last Updated", value: formatDate(dates.lastUpdated) },
  ];

  return (
    <section id="about" className="section-block">
      <div className="container">
        <Reveal>
          <div className="section-header">
            <h2 className="section-title">About & Info</h2>
            <p className="section-subtitle">
              A quick summary, current focus, and timeline details wired directly to profile data.
            </p>
          </div>
        </Reveal>

        <div className="about-grid">
          <Reveal direction="up" delayMs={getStaggerDelay(1)}>
            <div className="surface-card">
              <p className="card-label">Bio</p>
              <p className="about-bio">{bio}</p>

              <div className="focus-box">
                <strong>Current focus:</strong> {currentFocus}
              </div>
            </div>
          </Reveal>

          <Reveal direction="up" delayMs={getStaggerDelay(2)}>
            <div className="surface-card">
              <p className="card-label">Details & Dates</p>
              <dl className="meta-list">
                {infoItems.map((item) => (
                  <div key={item.label} className="meta-item">
                    <dt>{item.label}</dt>
                    <dd>{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
