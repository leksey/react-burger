import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import appHeaderStyles from './app-header.module.css';

const AppHeader = React.memo(() => {
    return (
        <header className={`${appHeaderStyles.header} pt-4 pb-4`}>
            <nav className={appHeaderStyles.nav}>
                <ul className={appHeaderStyles.menu}>
                    <li className={`${appHeaderStyles.menu__item} pl-5 pr-5 pt-4 pb-4`}>
                        <a className={appHeaderStyles.menu__link} href="#">
                            <BurgerIcon type="primary" />
                            <p className="text text_type_main-default pl-2 text_color_primary">Конструктор</p>
                        </a>
                    </li>
                    <li className={`${appHeaderStyles.menu__item} pl-5 pr-5 pt-4 pb-4`}>
                        <a className={appHeaderStyles.menu__link} href="#">
                            <ListIcon type="secondary" />
                            <p className="text text_type_main-default pl-2 text_color_inactive">Лента заказов</p>
                        </a>
                    </li>
                </ul>
                <div className={appHeaderStyles.logo}>
                    <Logo />
                </div>
                <div className={`${appHeaderStyles.menu__item} pl-5 pr-5 pt-4 pb-4`}>
                    <a className={appHeaderStyles.menu__link} href="#">
                        <ProfileIcon type="secondary" />
                        <p className="text text_type_main-default pl-2 text_color_inactive">Личный кабинет</p>
                    </a>
                </div>
            </nav>
        </header>
    );
})


export default AppHeader;
