import React from "react";
import C_HeaderComponent from "../Global/HeaderComponent";
import C_FooterComponent from "../Global/FooterComponent";
import styles from '../../../public/Customer/Department/css/department.module.css'

const DepartmentPage = ({ user, department, entities }) => {
    return (
        <>
            <C_HeaderComponent user={user} />
            <div className="page-body">
                <_self department={department} entities={entities} />
            </div>
            <C_FooterComponent />
        </>
    );
}

const _self = ({ department, entities }) => {
    const companiesElements: any[] = [];
    if (entities)
        entities.forEach(company => {
            companiesElements.push(
                <div className={styles.category} key={company.id}>
                    <div className={styles.background}>
                        <img src={company.details.logo} alt="" />
                    </div>
                    <div className={styles.title}>{company.details.displayName}</div>
                    <div className={styles.navigate}>
                        <a href={`/c/suppliers/${company.id}`}>
                            <i className="fa-solid fa-eye"></i>
                            <p>جميع المنتجات</p>
                        </a>
                    </div>
                </div>
            );
        })
    return (
        <>
            <main className="flex flex-col center">
                <section className={styles.categoriesHero + " " + styles.center}>
                    <div className={styles.background}>
                        <div className={styles.gradient}></div>
                        {/* <img src={department.images[0]} alt="" /> */}
                    </div>
                    <div className={styles.title}>
                        <p>{department.name}</p>
                    </div>
                    <div className={styles.path + " " + styles.center}>
                        <div className={styles.root}><p>الرئيسية</p></div>
                        <div className={styles.icon}>
                            <i className="fa-solid fa-angles-left"></i>
                        </div>
                        <div className={styles.subPath}><p>التصنيفات</p></div>
                    </div>
                </section>
                <section className={styles.categories}>
                    <div className={styles.title + " " + styles.center}><p>الموردون</p></div>
                    <div className={styles.types}>
                        {companiesElements}
                    </div>
                </section>
            </main>
        </>
    );
}

export default DepartmentPage;

export const getServerSideProps = async (context) => {
    return {
        props: JSON.parse(context.query.data)
    };
}