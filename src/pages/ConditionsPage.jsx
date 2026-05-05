import React from 'react';
import { overviewData } from '../data/mockData';
import InterestForm from '../components/home/InterestForm';

const ConditionsPage = () => {
    return (
        <div className="conditions-page">
            <div className="container section">
                <h1 className="section-title text-center" style={{ textAlign: 'center', marginBottom: '2rem' }}>Điều kiện mua Nhà ở xã hội</h1>

                <div className="conditions-content" style={{ maxWidth: '800px', margin: '0 auto' }}>
                    {overviewData.map((item) => (
                        <div key={item.id} className="condition-block" style={{ marginBottom: '2rem' }}>
                            <h2 className="condition-title" style={{ color: 'var(--primary-color)', marginBottom: '1rem', fontSize: '1.5rem' }}>
                                {item.title}
                            </h2>
                            <div className="condition-text" style={{ lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                               {item.content.split('\n').map((line, idx) => {
                                        const parts = line.split(/(\*\*.*?\*\*)/g);
                                        return (
                                            <p key={idx}>
                                                {parts.map((part, i) => {
                                                    if (part.startsWith('**') && part.endsWith('**')) {
                                                        return <b style={{ color:'#3f3f3f', lineHeight: 2.5}} key={i}>{part.slice(2, -2)}</b>;
                                                    }
                                                    return part;
                                                })}
                                            </p>
                                        );
                                    })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <InterestForm />
        </div>
    );
};

export default ConditionsPage;
