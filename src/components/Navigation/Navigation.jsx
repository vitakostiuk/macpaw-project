import Button from '../Button';
import NavItem from './NavItem';
import { navButtons } from '../../data/navigation';

const Navigation = () => {
  return (
    <section>
      <h1>Hi intern!</h1>
      <p>Welcome to MI 2022 Front-end test</p>
      <h2>Lets start using The Cat API</h2>
      <nav>
        {navButtons.map(({ name, image }, index) => (
          <Button key={index}>
            <NavItem name={name} image={image} />
          </Button>
        ))}
      </nav>
    </section>
  );
};

export default Navigation;
