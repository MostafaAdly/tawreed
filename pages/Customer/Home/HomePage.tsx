import React, { useEffect, useState } from "react";
import styles from '../../../public/Customer/Home/css/main.module.css'
import C_HeaderComponent from '../Global/HeaderComponent';
import C_FooterComponent from "../Global/FooterComponent";
import { _css, randomList } from "../../../public/Assets/Helpers";

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

    useEffect(() => {
        const categories = document.getElementById('categories');
        if (categories) {
            setInterval(() => {
                const element = randomList(categories.children);
                if (element && departments.find(dep => dep.departmentId == element.id)) {
                    const img = element.querySelector("img");
                    if (img) img.src = randomList(departments.find(dep => dep.departmentId == element.id).images)
                }
            }, 5000 + Math.floor(Math.random() * 5000));
        }
    }, []);

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
                        <div className={_css(styles, 'types center')} id="categories">
                            {departments.map((department,) => {
                                return (
                                    <a
                                        className={_css(styles, 'category opacity box-shadow-hover')}
                                        key={department.departmentId}
                                        id={department.departmentId}
                                        href={"/c/departments/" + department.departmentId}
                                    >
                                        <img src={randomList(department.images)} alt={department.name} />
                                        <div className={_css(styles, 'category-name center')}>
                                            <p>{department.name}</p>
                                        </div>
                                    </a>
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