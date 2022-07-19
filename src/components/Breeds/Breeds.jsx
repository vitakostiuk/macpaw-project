import { BallTriangle } from 'react-loader-spinner';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { ReactComponent as ArrowLeftBtn } from 'images/back-20.svg';
import { ReactComponent as SortAB } from 'images/sort-20.svg';
import { ReactComponent as SortBA } from 'images/soft-revert-20.svg';
import { limitImg } from '../../data/limitImg';
import * as api from '../../services/api-cat';
import s from './Breeds.module.css';

const BreedsPage = () => {
  const [allBreeds, setAllBreeds] = useState([]);
  const [breed, setBreed] = useState([]);
  const [breedsOptions, setBreedsOptions] = useState([]);
  const [name, setName] = useState('All breeds');
  const [limit, setLimit] = useState(20);
  const [page, setPage] = useState(0);
  const [typeOfSort, setTypeOfSort] = useState('ASC');
  const [isLoading, setIsLoading] = useState(false);
  const [hiddenBtn, setHiddenBtn] = useState(true);
  const [error, setError] = useState(null);

  const isFirstRender = useRef(true);

  const getBreedsOptions = data => {
    let breeds = data.map(({ name, id }) => {
      return { label: name, value: name, id };
    });
    const breedsOptions = [
      { label: 'All breeds', value: 'All breeds', id: '' },
      ...breeds,
    ];
    return breedsOptions;
  };

  // ---- GET ALL BREEDS
  useEffect(() => {
    if (name !== 'All breeds') {
      return;
    }

    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const getAllBreeds = async () => {
      try {
        setHiddenBtn(true);
        setIsLoading(true);

        // Update state --breedsOptions--
        const resultAll = await api.getData('breeds');
        setBreedsOptions(getBreedsOptions(resultAll));

        setAllBreeds([]);
        // Update state --allBreeds-- and render all breeds
        const result = await api.getBreeds(
          'breeds',
          limit,
          page,
          null,
          typeOfSort,
        );
        if (result.length === 0) {
          setHiddenBtn(false);
          NotificationManager.warning(`There are not already images!`);
          return setAllBreeds([]);
        }

        result.map(({ name, id, image }) =>
          setAllBreeds(prevAllBreeds => [
            ...prevAllBreeds,
            { name, id, image },
          ]),
        );
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setIsLoading(false);
        setHiddenBtn(false);
      }
    };
    getAllBreeds();
  }, [limit, name, page, typeOfSort]);

  // ---- GET ONE BREED
  useEffect(() => {
    if (name === 'All breeds') {
      setBreed([]);
      return;
    }

    const getBreed = async () => {
      try {
        setAllBreeds([]);
        setIsLoading(true);

        // Find image id by name
        const findBreedByName = breedsOptions.find(
          breed => breed.label === name,
        );
        const findedId = findBreedByName.id;

        // Update state --breed-- and render one breed's images
        const result = await api.getBreeds(
          'images/search',
          null,
          null,
          findedId,
        );
        if (result.length === 0) {
          NotificationManager.warning(`There are not already images!`);
          return setBreed([]);
        }
        setBreed(result);
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    getBreed();
  }, [breedsOptions, name]);

  // Update state --page--
  const incrementPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  const decrementPage = () => {
    setPage(prevPage => prevPage - 1);
  };

  // Update state --name--
  const handleChange = e => {
    if (e.target.name === 'breed') {
      setName(e.target.value);
    }
    if (e.target.name === 'limit') {
      setLimit(e.target.value);
    }
  };

  return (
    <div className={s.Paper}>
      <div className={s.BtnWrapper}>
        <button type="button" className={s.LeftArrowBtn}>
          <ArrowLeftBtn />
        </button>
        <button
          type="button"
          onClick={() => setName('All breeds')}
          className={s.BigButton}
        >
          BREEDS
        </button>
        <select name="breed" onChange={handleChange} className={s.SelectName}>
          {breedsOptions.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        {name === 'All breeds' && (
          <>
            <select
              name="limit"
              onChange={handleChange}
              className={s.SelectLimit}
            >
              {limitImg.map(({ value, label }) => (
                <option key={value} value={value}>
                  {`Limit: ${label}`}
                </option>
              ))}
            </select>
            <button
              type="button"
              className={s.SortBtn}
              onClick={() => setTypeOfSort('DESC')}
            >
              <SortAB className={s.Letter} />
            </button>
            <button
              type="button"
              className={s.SortBtn}
              onClick={() => setTypeOfSort('ASC')}
            >
              <SortBA className={s.Letter} />
            </button>
          </>
        )}
      </div>
      {isLoading && (
        <BallTriangle
          height="100"
          width="100"
          color="#ff868e"
          ariaLabel="loading"
        />
      )}

      {breed && (
        <ul className={s.GalleryWrap}>
          {breed.map(({ id, url }) => (
            <li key={id} className={s.GalleryItem}>
              <img src={url} alt={name} className={s.Img} />
            </li>
          ))}
        </ul>
      )}

      {allBreeds && (
        <ul className={s.GalleryWrap}>
          {allBreeds.map(({ name, id, image }) => (
            <li key={id} className={s.GalleryItem}>
              {image ? (
                <img src={image.url} alt="cat" className={s.Img} />
              ) : (
                <div className={s.ImgNotFound}>Image not found</div>
              )}
              <div className={s.After}>
                <button className={s.Name}>{name}</button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {!hiddenBtn && (
        <div>
          <button
            type="button"
            className={s.PrevievBtn}
            onClick={decrementPage}
          >
            Previev
          </button>
          <button type="button" className={s.NextBtn} onClick={incrementPage}>
            Next
          </button>
        </div>
      )}
      <NotificationContainer />
    </div>
  );
};

export default BreedsPage;
