import React from 'react';
import styles from './Footer.module.scss'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.wrapper}>

        <div className={styles.logo}>
          <div>
            <img src="logoBlack.png" alt="" />
            {/* <b>АПТЕКА</b> */}
          </div>
          {/* <div className={styles.title}>
            <a href="tel:7(499)390-49-16">
              <div className={styles.contact}>Персональные консультации и помощь: <h4>{' '}8(499)390-49-16</h4></div>
              <br />
            </a>
            <a href="mailto:info@aveapteka.ru">
              <span>info@aveapteka.ru</span>
            </a>
            <br />
            <div>Круглосуточно</div>
          </div> */}
        </div>

        <ul className={styles.menu}>
          <li><a href="/partners" >Партнерам</a></li>
          <li><a href="/about/howto/">Как купить</a></li>
          <li><a href="/about/delivery/">Доставка и оплата</a></li>
          <li><a href="/pages/license/">Лицензия и реквизиты</a></li>
          <li><a href="/pages/privacy/">Политика конфиденциальности</a></li>
          <li><a href="/pages/term-of-use/">Пользовательское соглашение</a></li>
        </ul>

      </div>
    </footer>
  );
};

export default Footer;