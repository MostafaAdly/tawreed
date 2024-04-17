import React from 'react'
import A_HeaderComponent from '../Global/HeaderComponent';
import A_SidebarComponent from '../Global/SidebarComponent';
import styles from '../../../public/AdminPanel/Dashboard/css/AdminDashboardPage.module.css'
import { _css, onTabClick } from '../../../public/Assets/Helpers'

const AdminDashboardPage = ({ user }) => {
    return (
        <>
            <A_HeaderComponent user={user} />
            <A_SidebarComponent />
            <main className={_css(styles, 'supplier-body')}>
                <_self user={user} />
            </main>
        </>
    );
}

const _self = ({ user }) => {
    return (
        <>
            <section className={_css(styles, 'info')}>
                <InfoBox label="شكوى جديدة" number={3} color="#674AFF" fontColor='white' />
                <InfoBox label="مستخدم جديد" number={65} color="#66cc99" fontColor='white' />
                <InfoBox label="طلب توريد" number={122} color="#fefefe" fontColor='#ffa500' />
                <InfoBox label="طلب استلام" number={78} color="#fefefe" fontColor='var(--standardcolor)' />
            </section>
            <section className={_css(styles, 'next-move')}>
                <section className={_css(styles, 'move-header')}>
                    <p className={_css(styles, 'label')}>الحركة القادمة</p>
                    <div className={_css(styles, 'duration center')}>
                        <p>2024-04-17 12:24:44</p>
                        <p>2024-04-17 12:24:44</p>
                    </div>
                    <div className={_css(styles, 'print')}>
                        <button className={_css(styles, 'center opacity-active')}>
                            <i className='fa-solid fa-print'></i>
                            <p>طباعة الحركة</p>
                        </button>
                    </div>
                </section>
                <section className={_css(styles, 'tabs')}>
                    <button
                        className={_css(styles, 'tab opacity-active activated-tab')}
                        onClick={(e) => onTabClick({ target: e.target, styles, activatedTabClassName: "activated-tab" })}
                        data-tab-id="outgoing"
                        data-default-display="flex"
                    >
                        <p>التوريد</p>
                    </button>
                    <button className={_css(styles, 'tab opacity-active')}
                        onClick={(e) => onTabClick({ target: e.target, styles, activatedTabClassName: "activated-tab" })}
                        data-tab-id="incoming"
                        data-default-display="flex"
                    >
                        <p>استلام البضائع</p>
                    </button>
                </section>
                <section className={_css(styles, 'outgoing')} id='outgoing'>
                    <table>
                        <tbody>
                            <tr>
                                <th><p>رقم العملية</p></th>
                                <th><p>التاريخ</p></th>
                                <th><p>المنطقة</p></th>
                                <th><p>عدد المنتجات</p></th>
                                <th><p>الكمية</p></th>
                                <th><p>الإجرائات</p></th>
                            </tr>
                            <tr>
                                <td><p>TE1234C</p></td>
                                <td><p>11/1/24</p></td>
                                <td><p>العبور</p></td>
                                <td><p>3 أصناف</p></td>
                                <td><p>240</p></td>
                                <td>
                                    <div className={_css(styles, 'controls center')}>
                                        <a className='center opacity-active' href="/">
                                            <i className='fa-solid fa-eye' />
                                        </a>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </section>
                <section className={_css(styles, 'incoming')} id='incoming' style={{ display: 'none' }}></section>
            </section>
        </>
    );
}

const InfoBox = ({ label, number, color, href = "/", fontColor = "black" }) => {
    return (
        <div className={_css(styles, 'info-box center')}>
            <div className={_css(styles, 'circle center')} style={{ backgroundColor: color }}>
                <p style={{ color: fontColor }}>{number}</p>
            </div>
            <div className={_css(styles, 'content center')}>
                <a className={_css(styles, 'icon center')} href={href}>
                    <i className='fa-solid fa-arrow-right'></i>
                </a>
                <div className={_css(styles, 'label')}>
                    <p>{label}</p>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboardPage;