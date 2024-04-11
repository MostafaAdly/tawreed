import React from "react";
import styles from '../../../public/Customer/Home/css/main.module.css'
import C_HeaderComponent from '../Global/HeaderComponent';
import C_FooterComponent from "../Global/FooterComponent";
import { _css } from "../../../public/Assets/Helpers";

const HomePage = ({ departments, user }) => {
    return (
        <>
            <C_HeaderComponent user={user} />
            <div className={_css(styles, 'page-body')}>
                <_self departments={departments} />
                <C_FooterComponent />
            </div>
        </>
    );
}

const _self = ({ departments }) => {
    return (
        <>
            <div className={_css(styles, 'container')}>
                <div className={_css(styles, 'hero')}>
                    <div className={_css(styles, 'background')}><div className={_css(styles, 'gradient')}></div></div>
                    <div className={_css(styles, 'titleContainer center')}>
                        <div className={_css(styles, 'title')}><p>الموقع الأول في مصر</p></div>
                        <div className={_css(styles, 'subTitle')}><p>لربط المشتريات والمبيعات</p></div>
                        {/* <div className={_css(styles, 'search center')}>
                            <div className={_css(styles, 'symbol')}>
                                <i className={_css(styles, 'fa-solid fa-magnifying-glass')}></i>
                            </div>
                            <div className={_css(styles, 'field')}>
                                <input
                                    type="text"
                                    name="search"
                                    id="search"
                                    placeholder="إبحث عن جميع احتياجاتك"
                                />
                            </div>
                            <div className={_css(styles, 'imageProvider center')}>
                                <i className={_css(styles, 'fa-solid fa-camera')}></i>
                            </div>
                        </div> */}
                    </div>
                    <div className={_css(styles, 'companyQualities center')}>
                        <div className={_css(styles, 'quality center')}>
                            <div className={_css(styles, 'symbol')}>
                                <i className={_css(styles, 'fa-solid fa-handshake-simple')}></i>
                            </div>
                            <div className={_css(styles, 'title')}><p>ثقة</p></div>
                            <div className={_css(styles, 'description')}>
                                <p>
                                    لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا
                                    يسكينج أليايت,سيت دو أيوسمود تيمبور
                                    أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا
                                </p>
                            </div>
                        </div>
                        <div className={_css(styles, 'quality center')}>
                            <div className={_css(styles, 'symbol')}>
                                <i className={_css(styles, 'fa-solid fa-hands-clapping')}></i>
                            </div>
                            <div className={_css(styles, 'title')}><p>سهولة</p></div>
                            <div className={_css(styles, 'description')}>
                                <p>
                                    لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا
                                    يسكينج أليايت,سيت دو أيوسمود تيمبور
                                    أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا
                                </p>
                            </div>
                        </div>
                        <div className={_css(styles, 'quality center')}>
                            <div className={_css(styles, 'symbol')}>
                                <i className={_css(styles, 'fa-solid fa-hands-holding-circle')}></i>
                            </div>
                            <div className={_css(styles, 'title')}><p>تواصل</p></div>
                            <div className={_css(styles, 'description')}>
                                <p>
                                    لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا
                                    يسكينج أليايت,سيت دو أيوسمود تيمبور
                                    أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <section id="departments">
                    <div className={_css(styles, 'categories center')} >
                        <div className={_css(styles, 'title center')}>
                            <p>التصنيفات</p>
                        </div>
                        <div className={_css(styles, 'description')}>
                            <p>لوريم ابسيم دولار ابسنت كوشسيسش</p>
                        </div>
                        <div className={_css(styles, 'types center')}>
                            {departments.map((department,) => {
                                return (
                                    <div className={_css(styles, 'category')} key={department.departmentId}>
                                        <div className={_css(styles, 'background')}>
                                            <div className={_css(styles, 'gradient')}></div>
                                            <img src={department.images[0]} alt={department.name} />
                                        </div>
                                        <div className={_css(styles, 'title')}>{department.name}</div>
                                        <div className={_css(styles, 'navigate')}>
                                            <a href={`/c/departments/${department.departmentId}`}>
                                                <i className={_css(styles, 'fa-solid fa-eye')}></i>
                                                <p>شاهد الكل</p>
                                            </a>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

export default HomePage;


export const getServerSideProps = async (context) => {
    return {
        props: JSON.parse(context.query.data)
    };
}