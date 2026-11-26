import { useState } from "react";
import { profile, type SkillCategory } from "../../data/profile";
import { Reveal } from "../ui/Reveal";
import { getStaggerDelay } from "../../lib/motion";

type FilterValue = "all" | SkillCategory;

const FILTER_OPTIONS: ReadonlyArray<{ value: FilterValue; label: string }> = [
  { value: "all", label: "All" },
  { value: "frontend", label: "Frontend" },
  { value: "backend", label: "Backend" },
  { value: "tools", label: "Tools" },
  { value: "other", label: "Game & Other" },
];

export function Skills() {
  const { skills } = profile;
  const [activeFilter, setActiveFilter] = useState<FilterValue>("all");

  const filteredSkills =
    activeFilter === "all"
      ? skills
      : skills.filter((skill) => skill.category === activeFilter);

  return (
    <section id="skills" className="section-block">
      <div className="container">
        <Reveal>
          <div className="section-header">
            <h2 className="section-title">Skills & Tools</h2>
            <p className="section-subtitle">
              Technologies and tools commonly used to build and test projects.
            </p>
          </div>
        </Reveal>

        <Reveal delayMs={60}>
          <div className="skill-filter-bar" role="tablist" aria-label="Filter skills by category">
            {FILTER_OPTIONS.map((option) => {
              const isSelected = activeFilter === option.value;
              const count =
                option.value === "all"
                  ? skills.length
                  : skills.filter((item) => item.category === option.value).length;

              return (
                <button
                  key={option.value}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  className={`filter-pill ${isSelected ? "is-active" : ""}`}
                  onClick={() => setActiveFilter(option.value)}
                >
                  <span>{option.label}</span>
                  <span className="filter-count">{count}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <div key={activeFilter} className="skills-grid skills-grid-enter">
          {filteredSkills.map((skill, index) => (
            <Reveal
              key={skill.name}
              direction="up"
              delayMs={getStaggerDelay(index)}
            >
              <article className="skill-card">
                <div className="skill-top">
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-level">{skill.level}</span>
                </div>
                <span className="skill-category">{skill.category}</span>
                {skill.note && <p className="skill-note">{skill.note}</p>}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
