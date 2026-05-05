import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, DollarSign, Building } from 'lucide-react';
import { useModal } from '../context/ModalContext';
import Button from './Button';
import './ProjectCard.css';

const ProjectCard = ({ project }) => {
    const { openModal } = useModal();

    const handleRegister = (e) => {
        e.preventDefault();
        openModal('register', { project });
    };

    return (
        <div className="project-card">
            <div className="card-image-wrapper">
                <img 
                    src={project.image} 
                    alt={project.name} 
                    className="card-image" 
                    loading="lazy"
                    decoding="async"
                />
                <span className={`card-status status-${project.status}`}>
                    {project.statusLabel}
                </span>
            </div>

            <div className="card-content">
                <Link to={`/du-an/${project.slug}`} className="card-title-link">
                    <h3 className="card-title">{project.name}</h3>
                </Link>

                <div className="card-info">
                    <div className="info-item">
                        <MapPin size={16} className="info-icon" />
                        <span>{project.location}</span>
                    </div>
                    <div className="info-item">
                        <DollarSign size={16} className="info-icon" />
                        <span className="info-price">{project.price}</span>
                    </div>
                    <div className="info-item">
                        <Building size={16} className="info-icon" />
                        <span>{project.scale}</span>
                    </div>
                </div>

                <div className="card-actions">
                    <Button to={`/du-an/${project.slug}`} variant="outline" className="card-btn">
                        Xem chi tiết
                    </Button>
                    <Button onClick={handleRegister} variant="primary" className="card-btn">
                        Đăng ký
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
