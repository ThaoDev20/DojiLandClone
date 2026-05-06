import HeroSection from '../components/home/HeroSection';
import EcosystemSection from '../components/home/EcosystemSection';
import IntroSection from '../components/home/IntroSection';
import EventsSection from '../components/home/EventsSection';
import ProjectsSection from '../components/home/ProjectsSection';

const Home = () => {
    return (
        <div className="home-page">
            <HeroSection />
            <IntroSection />
            <EventsSection />
            <ProjectsSection />
            <EcosystemSection />
        </div>
    );
};

export default Home;
