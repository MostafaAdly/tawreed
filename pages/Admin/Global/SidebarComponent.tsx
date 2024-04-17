
import React from 'react'
import S_SidebarComponent from '../../Supplier/Global/SidebarComponent';

const A_SidebarComponent = ({ }) => {
    return (
        <S_SidebarComponent tabs={
            [
                {
                    label: "الرئيسية",
                    icon: "table-cells-large",
                    href: "/a"
                },
                {
                    label: "التوريدات",
                    icon: "clipboard-list",
                    href: "/a"
                },
                {
                    label: "المستخدمين",
                    icon: "users",
                    href: "/a"
                },
                {
                    label: "المدفوعات",
                    icon: "money-bill-1",
                    href: "/a"
                },
                {
                    label: "الشكاوي",
                    icon: "flag",
                    href: "/a"
                },
                {
                    label: "التحليل",
                    icon: "chart-simple",
                    href: "/a"
                },
            ]
        } />
        // <>
        // </>
    );
}

export default A_SidebarComponent;