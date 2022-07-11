import Sidebar from '../Sidebar';
import Main from '../Main';
import s from './App.module.css';

const App = () => {
  return (
    <div className={s.Wrapper}>
      <Sidebar />
      <Main />
    </div>
  );
};

export default App;
