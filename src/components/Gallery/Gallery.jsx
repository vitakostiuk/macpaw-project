import { BallTriangle } from 'react-loader-spinner';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { useState, useEffect, useRef } from 'react';
import { ReactComponent as ArrowLeftBtn } from 'images/back-20.svg';
import GalleryForm from './GalleryForm';
import { getBreedsOptions } from 'utils/breedsOptions';
import * as api from 'services/api-cat';
import s from '../Breeds/Breeds.module.css';

const GalleryPage = () => {
  const [breedsOptions, setBreedsOptions] = useState([]);
  const [singleBreed, setSingleBreed] = useState([]);
  const [randomBreeds, setRandomBreeds] = useState([]);
  const [breed, setBreed] = useState('');
  const [order, setOrder] = useState('');
  const [type, setType] = useState('');
  const [limit, setLimit] = useState(20);
  const [isLoading, setIsLoading] = useState(false);

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const getBreeds = async () => {
      try {
        setIsLoading(true);
        setSingleBreed([]);

        // Update state --breedsOptions--
        const allBreeds = await api.getData('breeds');
        setBreedsOptions(
          getBreedsOptions(allBreeds, {
            label: 'None',
            value: 'None',
            id: '',
          }),
        );

        const result = await api.getSingleBreed(
          'images/search',
          20,
          null,
          '',
          '',
          '',
        );
        setRandomBreeds(result);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getBreeds();
  }, []);

  useEffect(() => {
    if (!breed) return;

    const getSingleBreedImages = async () => {
      try {
        setIsLoading(true);
        setRandomBreeds([]);
        setSingleBreed([]);
        // Find image id by name
        const findBreedByName = breedsOptions.find(
          option => option.label === breed,
        );
        const findedId = findBreedByName.id;

        const result = await api.getSingleBreed(
          'images/search',
          limit,
          null,
          findedId,
          order,
          type,
        );

        if (result.length === 0) {
          NotificationManager.warning(`There are not images!`);
          return setSingleBreed([]);
        }
        console.log(result);
        setSingleBreed(result);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getSingleBreedImages();
  }, [breed, breedsOptions, limit, order, type]);

  const addOptions = (breed, order, type, limit) => {
    setBreed(breed);
    setOrder(order);
    setType(type);
    setLimit(limit);
  };

  return (
    <div className={s.Paper}>
      <div className={s.BtnWrapper}>
        <button type="button" className={s.LeftArrowBtn}>
          <ArrowLeftBtn />
        </button>
        <button type="button" className={s.BigButton}>
          GALLERY
        </button>
      </div>
      <GalleryForm onSubmit={addOptions} breedsOptions={breedsOptions} />
      {isLoading && (
        <div className={s.Loader}>
          <BallTriangle
            height="70"
            width="70"
            color="#ff868e"
            ariaLabel="loading"
          />
        </div>
      )}

      {randomBreeds && (
        <ul className={s.GalleryWrap}>
          {randomBreeds.map(item => (
            <li key={item.id} className={s.GalleryItem}>
              {item ? (
                <img src={item.url} alt={breed} className={s.Img} />
              ) : (
                <div className={s.ImgNotFound}>Image not found</div>
              )}
            </li>
          ))}
        </ul>
      )}

      {singleBreed && (
        <ul className={s.GalleryWrap}>
          {singleBreed.map(item => (
            <li key={item.id} className={s.GalleryItem}>
              {item ? (
                <img src={item.url} alt={breed} className={s.Img} />
              ) : (
                <div className={s.ImgNotFound}>Image not found</div>
              )}
            </li>
          ))}
        </ul>
      )}
      <NotificationContainer />
    </div>
  );
};

export default GalleryPage;
