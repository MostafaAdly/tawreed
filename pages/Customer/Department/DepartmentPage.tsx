import React from "react";
import C_HeaderComponent from "../Global/HeaderComponent";
import C_FooterComponent from "../Global/FooterComponent";
import styles from '../../../public/Customer/Department/css/department.module.css'
import { _css, randomList } from "../../../public/Assets/Helpers";

const DepartmentPage = ({ user, department, entities }) => {
    return (
        <>
            <C_HeaderComponent user={user} />
            <div className={_css(styles, 'page-body')}>
                <_self department={department} entities={entities} />
                <C_FooterComponent />
            </div>
        </>
    );
}

const _self = ({ department, entities }) => {
    const companiesElements: any[] = [];
    if (entities)

        return (
            <>
                <main className={_css(styles, 'container center')}>
                    <section className={_css(styles, 'categoriesHero center')}>
                        <div className={_css(styles, 'background center')}>
                            <div className={_css(styles, 'gradient')}></div>
                            <img src={randomList(department.images)} alt="" />
                        </div>
                        <div className={_css(styles, 'title')}>
                            <p>{department.name}</p>
                        </div>
                        <div className={_css(styles, 'path center')}>
                            <div className={_css(styles, 'root')}><p>الرئيسية</p></div>
                            <div className={_css(styles, 'icon')}>
                                <i className={_css(styles, 'fa-solid fa-angles-left')}></i>
                            </div>
                            <div className={_css(styles, 'subPath')}><p>التصنيفات</p></div>
                        </div>
                    </section>
                    <section className={_css(styles, 'categories')}>
                        <div className={_css(styles, 'title center')}><p>الموردون</p></div>
                        <div className={_css(styles, 'types')}>
                            {entities.map((company, index) => {
                                return (
                                    <a className={_css(styles, 'category opacity')} key={index} href={`/c/suppliers/${company.entityId}`}>
                                        <div className={_css(styles, 'background')}>
                                            <img src={company.details.logo} alt={company.details.displayName + "'s logo"} />
                                        </div>
                                        <div className={_css(styles, 'title')}>{company.details.displayName}</div>
                                        <div className={_css(styles, 'navigate')}>
                                            <i className={_css(styles, 'fa-solid fa-eye')}></i>
                                            <p>جميع المنتجات</p>
                                        </div>
                                    </a>
                                );
                            })}
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