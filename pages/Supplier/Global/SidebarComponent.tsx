import React from "react";
import styles from '../../../public/Supplier/Global/css/sidebar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTableCellsLarge } from '@fortawesome/free-solid-svg-icons'
import { _css } from "../../../public/Assets/Helpers";



const S_SidebarComponent = ({ tabs =
    [
        {
            label: "الرئيسية",
            icon: "table-cells-large",
            href: "/s/dashboard"
        },
        {
            label: "شركتي",
            icon: "building",
            href: "/s"
        },
        {
            label: "منتجاتي",
            icon: "boxes-stacked",
            href: "/s/products"
        },
        {
            label: "طلباتي",
            icon: "bell-concierge",
            href: "/s/requests"
        },
        {
            label: "المدفوعات",
            icon: "money-bill-1",
            href: "/s/payments"
        },
        {
            label: "التحليل",
            icon: "chart-simple",
            href: "/s"
        },
    ]
}) => {
    return (
        <div className={_css(styles, 'sidebar')}>
            <div className={_css(styles, 'top-section')}>
                {
                    tabs.map((tab, index) => {
                        return (
                            <a key={index} href={tab.href}>
                                <div className={_css(styles, 'icon')}>
                                    <i className={_css(styles, 'fa-solid fa-' + tab.icon)}></i>
                                </div>
                                <div className={_css(styles, 'title')}>
                                    <p>{tab.label}</p>
                                </div>
                            </a>
                        );
                    })
                }
            </div>
            <div className={_css(styles, 'bottom-section')}>
                <a href="/s/chat">
                    <div className={_css(styles, 'icon')}>
                        <i className={_css(styles, 'fa-solid fa-message')}></i>
                    </div>
                    <div className={_css(styles, 'title')}>
                        <p>الرسائل</p>
                    </div>
                </a>
                <a href="/logout">
                    <div className={_css(styles, 'icon')}>
                        <i className={_css(styles, 'fa-solid fa-table-cells-large')}></i>
                    </div>
                    <div className={_css(styles, 'title')}>
                        <p>تسجيل الخروج</p>
                    </div>
                </a>
            </div>
        </div>
    );
}

export default S_SidebarComponent;