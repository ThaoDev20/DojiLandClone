import HeroSection from '../components/home/HeroSection';
import EcosystemSection from '../components/home/EcosystemSection';
import IntroSection from '../components/home/IntroSection';
import EventsSection from '../components/home/EventsSection';
import ProjectsSection from '../components/home/ProjectsSection';
import MediaGallery from './MediaGallery';

const Home = () => {
    return (
        <div className="home-page">
            <HeroSection />
            <ProjectsSection />
            {/* <IntroSection /> */}
            <EventsSection />
            <MediaGallery />
            {/* <EcosystemSection /> */}
        </div>
    );
};

export default Home;
