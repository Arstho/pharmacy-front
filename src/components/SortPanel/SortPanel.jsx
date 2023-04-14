import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cleanCategories,
  fetchCategories,
  switchCategory,
} from "../../redux/features/categorySlice";
import { cleanPharmacies, getPharmacies, switchPharmacy } from "../../redux/features/pharmacySlice";
import styles from "./SortPanel.module.scss";
import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { cleanTypeDosage, switchTypeDosage } from "../../redux/features/medicineSlice";
import { useState } from "react";

const SortPanel = ({ valuePrice, setValuePrice }) => {
  const dispatch = useDispatch();
  // const [selectedPharmacy, setSelectedPharmacy] = useState("");

  const pharmacies = useSelector((state) => state.pharmacy.pharmacies);
  const categories = useSelector((state) => state.category.categories);
  const typesDosage = useSelector((state) => state.medicine.typeDosage);
  const medicine = useSelector((state) => state.medicine.medicines);

  const selectCategories = useSelector((state) => state.category.selectCategories);
  const selectPharmacies = useSelector((state) => state.pharmacy.selectPharmacies);
  const selectTypeDosage = useSelector((state) => state.medicine.selectTypeDosage);

  const handleCategory = (value) => {
    dispatch(switchCategory(value));
  };

  const handleTypeDosage = (value) => {
    dispatch(switchTypeDosage(value));
  };

  const handlePharmacies = (value) => {
    dispatch(switchPharmacy(value));
  };

  const handleChange = (event, newValue) => {
    setValuePrice(newValue);
  };

  function valuetext(value) {
    return `${value}°C`;
  }

  function handleFilter() {
    dispatch(cleanCategories());
    dispatch(cleanTypeDosage());
    dispatch(cleanPharmacies());
    setValuePrice([0, 3000]);
    window.scrollTo(0, 0);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchCategories());
    dispatch(getPharmacies());
  }, []);

  if (!pharmacies) {
    console.log("loading");
  }

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <div className={styles.price}>
          <h2>Розничная цена</h2>
          <div className={styles.range}>
            <Box sx={{ width: 300 }}>
              <Slider
                getAriaLabel={() => "Temperature range"}
                value={valuePrice}
                max={3000}
                min={0}
                onChange={handleChange}
                valueLabelDisplay='auto'
                getAriaValueText={valuetext}
                style={{ color: "black" }}
              />
            </Box>
            <div className={styles.labels}>
              <label htmlFor='' className={styles.label}>
                <span>от</span>
                <input
                  type='number'
                  value={valuePrice[0]}
                  max={3000}
                  min={0}
                  id='input-2'
                  placeholder='от 100'
                />
                <span>₱</span>
              </label>
              <label htmlFor='' className={styles.label}>
                <span>до</span>
                <input
                  type='number'
                  value={valuePrice[1]}
                  max={3000}
                  min={0}
                  id='input-2'
                  placeholder='до 9999'
                />
                <span>₱</span>
              </label>
            </div>
          </div>
        </div>
        <div className={styles.pharmacy}>
          <h2 className={styles.title}>Аптека</h2>
          <ul className={styles.list}>
            {pharmacies &&
              pharmacies.map((pharm) => {
                const classActive = selectPharmacies.includes(pharm.pharmacyName);
                return (
                  <div
                    key={pharm._id}
                    onClick={() => handlePharmacies(pharm.pharmacyName)}
                    className={classActive ? `${styles.select}` : `${styles.li}`}>
                    {pharm.pharmacyName}
                  </div>
                );
              })}
          </ul>
        </div>
        <div className={styles.category}>
          <h2 className={styles.title}>Категория</h2>
          <ul className={styles.list}>
            {categories &&
              categories.map((cat) => {
                const classActive = selectCategories.includes(cat.name);
                return (
                  <div
                    key={cat._id}
                    onClick={() => handleCategory(cat.name)}
                    className={classActive ? `${styles.select}` : `${styles.li}`}>
                    {cat.name}
                  </div>
                );
              })}
          </ul>
        </div>
        <div className={styles.tablets_type}>
          <h2 className={styles.title}>Лекарственная форма</h2>
          <ul className={styles.list}>
            {typesDosage.map((form, i) => {
              const classActive = selectTypeDosage.includes(form);
              return (
                <div
                  onClick={() => handleTypeDosage(form)}
                  key={i}
                  className={classActive ? `${styles.select}` : `${styles.li}`}>
                  {form}
                </div>
              );
            })}
          </ul>
        </div>
        <button onClick={handleFilter} className={styles.reset_filters}>
          Отчистить фильтр
        </button>
      </div>
    </div>
  );
};

export default SortPanel;
