import Hero from '../Hero';
import Header from '../Header';
import VotingPage from '../VotingPage';
import BreedsPage from '../BreedsPage';
import GalleryPage from '../GalleryPage';
import s from './Main.module.css';

const Main = () => {
  return (
    <main className={s.Main}>
      <Hero />
      <Header />
      <VotingPage />
      <BreedsPage />
      <GalleryPage />
    </main>
  );
};

export default Main;
