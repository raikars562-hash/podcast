import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Player from './components/Player';
import BackToTop from './components/BackToTop';
import KeyboardHelp from './components/KeyboardHelp';
import { ToastProvider } from './components/Toast';
import Home from './pages/Home';
import Discover from './pages/Discover';
import Trending from './pages/Trending';
import Categories from './pages/Categories';
import PodcastDetail from './pages/PodcastDetail';
import Guests from './pages/Guests';
import About from './pages/About';
import Subscribe from './pages/Subscribe';
import Contact from './pages/Contact';
import Pricing from './pages/Pricing';
import { SignIn, SignUp } from './pages/Auth';
import Episodes from './pages/Episodes';
import EpisodeDetail from './pages/EpisodeDetail';
import Library from './pages/Library';
import SearchResults from './pages/SearchResults';
import Stats from './pages/Stats';
import NotFound from './pages/NotFound';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

const noFooterRoutes = ['/signin', '/signup'];
const noNavRoutes = [];

export default function App() {
  const { pathname } = useLocation();
  const showFooter = !noFooterRoutes.includes(pathname);
  const showNav = !noNavRoutes.includes(pathname);

  return (
    <ToastProvider>
      <ScrollToTop />
      {showNav && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/podcast/:id" element={<PodcastDetail />} />
        <Route path="/episodes" element={<Episodes />} />
        <Route path="/episode/:id" element={<EpisodeDetail />} />
        <Route path="/guests" element={<Guests />} />
        <Route path="/about" element={<About />} />
        <Route path="/subscribe" element={<Subscribe />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/library" element={<Library />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {showFooter && <Footer />}
      <Player />
      <BackToTop />
      <KeyboardHelp />
    </ToastProvider>
  );
}

