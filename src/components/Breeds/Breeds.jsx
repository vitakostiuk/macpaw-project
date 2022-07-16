import { BallTriangle } from 'react-loader-spinner';
import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { ReactComponent as ArrowLeftBtn } from 'images/back-20.svg';
import * as api from '../../services/api-cat';
import s from './Breeds.module.css';

const BreedsPage = () => {
  const [breeds, setBreeds] = useState([]);
  // const [isClickBreeds, setIsClickBreeds] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);

  const isFirstRender = useRef(true);

  // First render
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const getBreeds = async () => {
      try {
        setIsLoading(true);
        const result = await api.getData('breeds');
        console.log(result);

        for (let i = 0; i <= result.length; i++) {
          const name = result[i].name;
          const objImg = result[i].image;
          const breed = { name, id: objImg.id, url: objImg.url };
          setBreeds(prevBreeds => [...prevBreeds, breed]);
        }
      } catch (error) {
        console.log(error);
        // setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    getBreeds();
  }, []);

  return (
    <div className={s.Paper}>
      <div className={s.BtnWrapper}>
        <button type="button" className={s.LeftArrowBtn}>
          <ArrowLeftBtn />
        </button>
        <button
          type="button"
          // onClick={() => setIsClickBreeds(true)}
          className={s.BigButton}
        >
          BREEDS
        </button>
      </div>

      <ul className={s.GalleryWrap}>
        {isLoading && (
          <BallTriangle
            height="100"
            width="100"
            color="#ff868e"
            ariaLabel="loading"
          />
        )}

        {breeds.map(({ name, id, url }) => (
          <li key={id} className={s.GalleryItem}>
            <img src={url} alt="cat" className={s.Img} />
            <div className={s.After}>
              <button className={s.Name}>{name}</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BreedsPage;
