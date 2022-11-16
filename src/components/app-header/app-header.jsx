import React from 'react';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import appHeaderStyles from './app-header.module.css';

function AppHeader() {
    return (
        <header className={`${appHeaderStyles.header} pt-4 pb-4`}>
            <nav className={appHeaderStyles.nav}>
                <ul className={appHeaderStyles.menu}>
                    <li className={`${appHeaderStyles.menu__item} pl-5 pr-5 pt-4 pb-4`}>
                        <BurgerIcon type="secondary" />
                        <p className="text text_type_main-default pl-2 text_color_inactive">Конструктор</p>
                    </li>
                    <li className={`${appHeaderStyles.menu__item} pl-5 pr-5 pt-4 pb-4`}>
                        <ListIcon type="secondary" />
                        <p className="text text_type_main-default pl-2 text_color_inactive">Лента заказов</p>
                    </li>
                </ul>
                <div className={appHeaderStyles.logo}>
                    <Logo />
                </div>
                <div className={`${appHeaderStyles.menu__item} pl-5 pr-5 pt-4 pb-4`}>
                    <ProfileIcon type="secondary" />
                    <p className="text text_type_main-default pl-2 text_color_inactive">Личный кабинет</p>
                </div>
            </nav>
        </header>
    );
}


export default AppHeader;
