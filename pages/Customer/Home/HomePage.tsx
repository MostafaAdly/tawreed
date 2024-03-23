import React from "react";
import styles from '../../../public/Customer/Home/css/main.module.css'
import C_HeaderComponent from '../Global/HeaderComponent';
import C_FooterComponent from "../Global/FooterComponent";

const HomePage = ({ departments, user }) => {
    return (
        <>
            <C_HeaderComponent user={user} />
            <div className="page-body">
                <_self departments={departments} />
            </div>
            <C_FooterComponent />
        </>
    );
}

const _self = ({ departments }) => {
    const deps: any[] = [];
    departments.map((department) => {
        deps.push(
            <div className={styles.category} key={department.id}>
                <div className={styles.background}>
                    <div className={styles.gradient}></div>
                    <img src={department.images[0]} alt={department.name} />
                </div>
                <div className={styles.title}>{department.name}</div>
                <div className={styles.navigate}>
                    <a href={`/departments/${department.id}`}>
                        <i className="fa-solid fa-eye"></i>
                        <p>شاهد الكل</p>
                    </a>
                </div>
            </div>
        );
    })
    return (
        <>
            <div className={styles.container}>
                <div className={styles.hero}>
                    <div className={styles.background}><div className={styles.gradient}></div></div>
                    <div className={styles.titleContainer + " " + styles.center}>
                        <div className={styles.title}><p>الموقع الأول في مصر</p></div>
                        <div className={styles.subTitle}><p>لربط المشتريات والمبيعات</p></div>
                        <div className={styles.search + " " + styles.center}>
                            <div className={styles.symbol}>
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </div>
                            <div className={styles.field}>
                                <input
                                    type="text"
                                    name="search"
                                    id="search"
                                    placeholder="إبحث عن جميع احتياجاتك"
                                />
                            </div>
                            <div className={styles.imageProvider + " " + styles.center}>
                                <i className="fa-solid fa-camera"></i>
                            </div>
                        </div>
                    </div>
                    <div className={styles.companyQualities + " " + styles.center}>
                        <div className={styles.quality + " " + styles.center}>
                            <div className={styles.symbol}>
                                <i className="fa-solid fa-handshake-simple"></i>
                            </div>
                            <div className={styles.title}><p>ثقة</p></div>
                            <div className={styles.description}>
                                <p>
                                    لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا
                                    يسكينج أليايت,سيت دو أيوسمود تيمبور
                                    أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا
                                </p>
                            </div>
                        </div>
                        <div className={styles.quality + " " + styles.center}>
                            <div className={styles.symbol}>
                                <i className="fa-solid fa-hands-clapping"></i>
                            </div>
                            <div className={styles.title}><p>سهولة</p></div>
                            <div className={styles.description}>
                                <p>
                                    لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا
                                    يسكينج أليايت,سيت دو أيوسمود تيمبور
                                    أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا
                                </p>
                            </div>
                        </div>
                        <div className={styles.quality + " " + styles.center}>
                            <div className={styles.symbol}>
                                <i className="fa-solid fa-hands-holding-circle"></i>
                            </div>
                            <div className={styles.title}><p>تواصل</p></div>
                            <div className={styles.description}>
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
                    <div className={styles.categories + " " + styles.center} >
                        <div className={styles.title + " " + styles.center}>
                            <p>التصنيفات</p>
                        </div>
                        <div className={styles.description}>
                            <p>لوريم ابسيم دولار ابسنت كوشسيسش</p>
                        </div>
                        <div className={styles.types + " " + styles.center}>
                            {deps}
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