import React from 'react'
import S_HeaderComponent from '../Global/HeaderComponent';
import S_SidebarComponent from '../Global/SidebarComponent';
import styles from '../../../public/Supplier/MyRequests/css/SupplierApproveOrderPage.module.css'
import { _css, getImage } from '../../../public/Assets/Helpers';

const SupplierApproveOrderPage = ({ user, entity }) => {

  return (
    <>
      <S_HeaderComponent user={user} entity={entity} />
      <S_SidebarComponent />
      <div className={_css(styles, 'supplier-body')}>
        <_self entity={entity} />
      </div>
    </>
  );
}

const _self = ({ entity }) => {
  return (
    <>
      <section className={_css(styles, 'order-info')}>
        <div className={_css(styles, 'info')}>
          <div className={_css(styles, 'title')}>
            <p>رقم العملية</p>
          </div>
          <p>123456789</p>
        </div>
        <div className={_css(styles, 'info')}>
          <div className={_css(styles, 'title')}>
            <p>تاريخ الطلب</p>
          </div>
          <p>11/1/2024</p>
        </div>
      </section>
      <div className={_css(styles, 'divider')}></div>
      <section className={_css(styles, 'customer-info')}>
        <div className={_css(styles, 'title')}>
          <p>بيانات العميل</p>
        </div>
        <div className={_css(styles, 'data')}>
          <div className={_css(styles, 'info')}>
            <div className={_css(styles, 'name')}>
              <p>إسم الشركة</p>
            </div>
            <div className={_css(styles, 'result')}>
              <p>الرضوان للصناعة والتجارة</p>
            </div>
          </div>
          <div className={_css(styles, 'info')}>
            <div className={_css(styles, 'name')}>
              <p>إسم الشركة</p>
            </div>
            <div className={_css(styles, 'result')}>
              <p>الرضوان للصناعة والتجارة</p>
            </div>
          </div>
          <div className={_css(styles, 'info')}>
            <div className={_css(styles, 'name')}>
              <p>البطاقة الضريبية</p>
            </div>
            <div className={_css(styles, 'result')}>
              <p>123456</p>
            </div>
          </div>
          <div className={_css(styles, 'info')}>
            <div className={_css(styles, 'name')}>
              <p>سجل التجاري</p>
            </div>
            <div className={_css(styles, 'result')}>
              <p>123456</p>
            </div>
          </div>
        </div>
      </section>
      <div className={_css(styles, 'divider')}></div>
      <section className={_css(styles, 'products')}>
        <div className={_css(styles, 'title')}>
          <p>بيانات الاصناف</p>
        </div>
        <div className={_css(styles, 'self')}>
          <div className={_css(styles, 'product')}>
            <div className={_css(styles, 'image')}>
              <div className={_css(styles, 'image-self')}>
                <img src={getImage("background.jpeg")} alt="" />
              </div>
              <div className={_css(styles, 'code')}>
                <p>PIDad1234c</p>
              </div>
            </div>
            <div className={_css(styles, 'product-info')}>
              <div className={_css(styles, 'name')}>
                <p>لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور</p>
                <select className='control-menu' name="control-menu-p-123" id="control-menu-p-123">
                  <option value="1">تأكيد التوريد</option>
                  <option value="2">غير متوفر</option>
                  <option value="3">خطأ في السعر</option>
                  <option value="4">نفاذ المخزون</option>
                  <option value="5">المخزون غير كافي</option>
                </select>
              </div>
              <div className={_css(styles, 'data')}>
                <div className={_css(styles, 'product-data')}>
                  <p className={_css(styles, 'data-name')}>الوحدة</p>
                  <p>دستة</p>
                </div>
                <div className={_css(styles, 'product-data')}>
                  <p className={_css(styles, 'data-name')}>الكمية</p>
                  <p>100</p>
                </div>
                <div className={_css(styles, 'symbol')}>
                  <i className={_css(styles, 'fa-solid fa-xmark')}></i>
                </div>
                <div className={_css(styles, 'product-data')}>
                  <p className={_css(styles, 'data-name')}>سعر الوحدة</p>
                  <p>1500 ج.م</p>
                </div>
                <div className={_css(styles, 'symbol')}>
                  <i className={_css(styles, 'fa-solid fa-equals')}></i>
                </div>
                <div className={_css(styles, 'product-data')}>
                  <p className={_css(styles, 'data-name')}>الإجمالي</p>
                  <p>150,000 ج.م</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className={_css(styles, 'divider')}></div>
      <section className={_css(styles, 'payment-info')}>
        <div className={_css(styles, 'title')}>
          <p>بيانات الدفع</p>
        </div>
        <div className={_css(styles, 'data')}>
          <div className={_css(styles, 'info')}>
            <div className={_css(styles, 'name')}>
              <p>الإجمالي قبل الضريبة</p>
            </div>
            <div className={_css(styles, 'result')}>
              <p>487,000 ج.م</p>
            </div>
          </div>
          <div className={_css(styles, 'info')}>
            <div className={_css(styles, 'name')}>
              <p>ضريبة القيمة المضافة</p>
            </div>
            <div className={_css(styles, 'result')}>
              <p>63,000 ج.م</p>
            </div>
          </div>
          <div className={_css(styles, 'info')}>
            <div className={_css(styles, 'name')}>
              <p>الإجمالي</p>
            </div>
            <div className={_css(styles, 'result')}>
              <p>450,000 ج.م</p>
            </div>
          </div>
          <div className={_css(styles, 'info')}>
            <div className={_css(styles, 'name')}>
              <p>طريقة الدفع</p>
            </div>
            <div className={_css(styles, 'result')}>
              <p>الدفع عند الإستلام</p>
            </div>
          </div>
        </div>
      </section>
      <section className={_css(styles, 'approve center')}>
        <button className='center'>
          <i className={_css(styles, 'fa-solid fa-arrow-right')}></i>
          <p>أرسل تأكيد الطلب</p>
        </button>
      </section>
    </>
  );
}


export default SupplierApproveOrderPage;

export const getServerSideProps = async (context) => {
  return {
    props: JSON.parse(context.query.data)
  };
}
