import { useState } from 'react';
// import { useState, useEffect, useRef } from 'react';
import { ReactComponent as UpdateBtn } from 'images/update-20.svg';
import { limitImg } from 'data/options';
import { orderList } from 'data/options';
import { typeList } from 'data/options';
import s from './GalleryForm.module.css';

const GalleryForm = ({ onSubmit, breedsOptions }) => {
  const [breed, setBreed] = useState('');
  const [order, setOrder] = useState('');
  const [type, setType] = useState('jpg,png');
  const [limit, setLimit] = useState(20);

  const handleChange = e => {
    const { name, value } = e.target;

    switch (name) {
      case 'breed':
        setBreed(value);
        break;
      case 'order':
        setOrder(value);
        break;
      case 'type':
        setType(value);
        break;
      case 'limit':
        setLimit(value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(breed, order, type, limit);
  };

  return (
    <>
      <form className={s.Form} onSubmit={handleSubmit}>
        <div className={s.SelectWrapper}>
          <label className={s.SelectLabel}>ORDER</label>
          <select
            name="order"
            onChange={handleChange}
            className={s.SelectOrder}
          >
            {orderList.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div className={s.SelectWrapper}>
          <label className={s.SelectLabel}>TYPE</label>
          <select name="type" onChange={handleChange} className={s.SelectType}>
            {typeList.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div className={s.SelectWrapper}>
          <label className={s.SelectLabel}>BREED</label>
          <select
            name="breed"
            onChange={handleChange}
            className={s.SelectBreed}
          >
            {breedsOptions.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div className={s.SelectWrapper}>
          <label className={s.SelectLabel}>LIMIT</label>
          <select
            name="limit"
            onChange={handleChange}
            className={s.SelectLimit}
          >
            {limitImg.map(({ value, label }) => (
              <option key={value} value={value}>
                {`${label} items per page`}
              </option>
            ))}
          </select>
        </div>

        <div className={s.SelectWrapper}>
          <button type="submit" className={s.FormBtn}>
            <UpdateBtn className={s.ImgBtn} />
          </button>
        </div>
      </form>
    </>
  );
};

export default GalleryForm;
