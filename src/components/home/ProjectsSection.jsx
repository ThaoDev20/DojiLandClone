import React, { useEffect, useMemo, useRef } from 'react';
import './ProjectsSection.css';
import { useData } from '../../context/DataContext';
import { Link } from 'react-router-dom';

const ProjectSection = () => {
  const { projects: projects2 } = useData();
  const itemRefs = useRef([]);

  console.log('projects2', projects2);

  const projects = useMemo(() => {
    return (projects2 || []).filter((item) => item.isVisible !== false);
  }, [projects2]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('project-feature-visible');
          }
        });
      },
      {
        threshold: 0.25,
      }
    );

    itemRefs.current.forEach((item) => {
      if (item) observer.observe(item);
    });

    return () => observer.disconnect();
  }, [projects]);

  if (!projects.length) return null;

  return (
    <section className="project-feature-section">
      {projects.map((project, index) => {
        const layoutClass =
          index === 0
            ? 'project-feature-first'
            : index % 2 === 1
              ? 'project-feature-image-right'
              : 'project-feature-image-left';

        return (
          <article
            key={project.id || project.slug || index}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            className={`project-feature-card ${layoutClass}`}
          >
            <div className="project-feature-image-wrap">
              <img
                src={project.image || project.projectImages?.[0]}
                alt={project.name}
                className="project-feature-image"
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            </div>

            <div className="project-feature-content">
              <p className="project-feature-status">{project.statusLabel}</p>

              <h2>{project.name}</h2>

              <div className="project-feature-line" />

              <p className="project-feature-desc">
                {project.description ||
                  `${project.location || ''}${project.area ? ` · ${project.area}` : ''}${project.price ? ` · ${project.price}` : ''
                  }`}
              </p>

              <Link href={`/du-an/${project.slug}`} className="project-feature-button">
                XEM THÊM
              </Link>
            </div>
          </article>
        );
      })}
    </section>
  );
};

export default ProjectSection;