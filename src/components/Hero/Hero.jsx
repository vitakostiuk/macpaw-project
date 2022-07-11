import { ReactComponent as HeroSvg } from 'images/girl-and-pet.svg';
import s from './Hero.module.css';

const Hero = () => {
  return (
    <div className={s.Wrapper}>
      <HeroSvg className={s.HeroImg} />
    </div>
  );
};

export default Hero;
