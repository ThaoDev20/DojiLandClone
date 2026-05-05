import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import ProjectCard from '../components/ProjectCard';
import './ProjectListPage.css';

const ProjectListPage = () => {
    const { visibleProjects: projects, provinces } = useData();
    const [filterProvince, setFilterProvince] = useState('all');

    const filteredProjects = filterProvince === 'all'
        ? projects
        : projects.filter(p => p.province === filterProvince);

    return (
        <div className="project-list-page container section">
            <div className="list-header">
                <h1 className="list-title">Danh sách Dự án NOXH</h1>
                <div className="list-filters">
                    <select
                        className="province-filter"
                        value={filterProvince}
                        onChange={(e) => setFilterProvince(e.target.value)}
                    >
                        <option value="all">Tất cả tỉnh thành</option>
                        {provinces.map(p => (
                            <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            {filteredProjects.length > 0 ? (
                <div className="projects-grid">
                    {filteredProjects.map(project => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            ) : (
                <div className="empty-state">
                    <p>Không tìm thấy dự án nào phù hợp.</p>
                </div>
            )}
        </div>
    );
};

export default ProjectListPage;
