import React, { useState } from "react";
import C_HeaderComponent from "../Global/HeaderComponent";
import C_FooterComponent from "../Global/FooterComponent";
import styles from "../../../public/Customer/Supplier/css/ProductPage.module.css";
import {
  _css,
  getImage,
  onTabClick,
  purchaseProduct,
  sendComment,
} from "../../../public/Assets/Helpers";
import SentForm from "../../../public/Assets/Components/SentForm";

const SupplierPage = ({ user, supplier, product, comments }) => {
  return (
    <>
      <C_HeaderComponent user={user} />
      <div className={_css(styles, "page-body")}>
        <_self
          user={user}
          supplier={supplier}
          product={product}
          comments={comments}
        />
        <C_FooterComponent />
      </div>
    </>
  );
};

const _self = ({ user, supplier, product, comments }) => {
  const [image, setImage] = useState(product.images[0]);
  const [images, setImages] = useState(
    product.images.filter((img) => img != image)
  );
  const [sentForm, setSentForm] = useState(false);
  const [errorForm, setErrorForm] = useState(false);
  const [formTitle, setFormTitle] = useState("تم تأكيد طلب العرض بنجاح");
  const [_comments, setComments] = useState(comments);

  const onSentFormClick = () => {
    setSentForm(false);
  };

  // const onPurchase = async (e) => {
  //   setSentForm(true);
  //   const response =
  //     (await purchaseProduct({
  //       userId: user._id,
  //       token: user.token,
  //       productId: product._id,
  //       supplierId: supplier._id,
  //       customerId: user.entity,
  //     })) || {};
  //   setFormTitle(
  //     response.success ? "تم ارسال طلبك الى الشركة بنجاح" : "حدث خطأ"
  //   );
  //   setErrorForm(!response.success);
  //   setSentForm(true);
  // };

  const onRFQ = (e) => {
    location.href = `/c/suppliers/${supplier.entityId}/products/${product.productId}/rfq`;
  };

  const onImageSelect = (target) => {
    setImage(target.src);
    setImages(product.images.filter((img) => img != target.src));
  };

  const onCommentSend = async () => {
    const contentArea = document.getElementById("comment-area") as any;
    if (!contentArea) return;
    const response = await sendComment({
      userId: user._id,
      token: user.token,
      productId: product._id,
      content: contentArea.value,
    });
    if (response?.success) {
      setComments([
        ..._comments,
        { user, content: contentArea.value, createdAt: new Date() },
      ]);
      contentArea.value = "";
      showReviewsSection();
    }
  };

  const showReviewsSection = () => {
    const tab = document.getElementById("reviews-tab");
    if (!tab) return;
    onTabClick({ styles, target: tab });
  };

  return (
    <>
      <SentForm
        active={sentForm}
        title={formTitle}
        text="العودة إلى صفحة الطلب الآن"
        error={errorForm}
        callback={onSentFormClick}
      />
      <div className={_css(styles, "container center")}>
        <section className={_css(styles, "top-container")}>
          <div className={_css(styles, "product-container")}>
            <section className={_css(styles, "right-box")}>
              <div className={_css(styles, "product-name")}>
                <p>{product.name}</p>
              </div>
              <div className={_css(styles, "product-info")}>
                <div className={_css(styles, "product-company")}>
                  <p>شركة:</p>
                  <p>{supplier.details.displayName}</p>
                </div>
                <div className={_css(styles, "evaluation center")}>
                  <i className={_css(styles, "fa-solid fa-star")}></i>
                  <p>
                    {"4.5"} من {"15"} تقييم
                  </p>
                </div>
              </div>
              <div className={_css(styles, "product-cost center")}>
                <p>السعر يبدأ من</p>
                <p>{product.price.cost}</p>
                <p>{product.price.currency}</p>
              </div>
              <div className={_css(styles, "description")}>
                <p>{product.description}</p>
              </div>
              <div className={_css(styles, "product-cost center")}>
                <p>أقل كمية للطلب</p>
                <p>{product.price.quantity}</p>
                <p>دستة</p>
              </div>
              <div className={_css(styles, "controls center")}>
                <a
                  className={_css(
                    styles,
                    "center opacity-active box-shadow-hover"
                  )}
                  onClick={(e) => onRFQ(e)}
                >
                  <i className={_css(styles, "fa-solid fa-angles-right")}></i>
                  <p>أطلب عرض سعر</p>
                </a>
                {/* <a
                  className={_css(
                    styles,
                    "rfq center opacity-active box-shadow-hover"
                  )}
                  onClick={(e) => onRFQ(e)}
                >
                  <i
                    className={_css(
                      styles,
                      "fa-solid fa-file-circle-exclamation"
                    )}
                  ></i>
                  <p>عرض سعر فوري</p>
                </a> */}
              </div>
            </section>
            <section className={_css(styles, "left-box")}>
              <div className={_css(styles, "current")}>
                <img src={image} alt="" />
              </div>
              <div className={_css(styles, "other center")}>
                {images.map((image, index) => (
                  <img
                    className={_css(styles, "opacity")}
                    key={index}
                    src={image}
                    alt=""
                    onClick={(e) => onImageSelect(e.target)}
                  />
                ))}
              </div>
            </section>
          </div>
          <section className={_css(styles, "details")}>
            <div className={_css(styles, "tabs")}>
              <button
                className={_css(styles, "tab activated")}
                onClick={(e) => onTabClick({ target: e.target, styles })}
                data-tab-id="info"
                data-default-display="flex"
              >
                <p>المزيد من التفاصيل</p>
              </button>
              <button
                className={_css(styles, "tab")}
                onClick={(e) => onTabClick({ target: e.target, styles })}
                data-tab-id="reviews"
                data-default-display="flex"
                id="reviews-tab"
              >
                <p>تقييمات العملاء</p>
              </button>
              <button
                className={_css(styles, "tab")}
                onClick={(e) => onTabClick({ target: e.target, styles })}
                data-tab-id="add-review"
                data-default-display="flex"
              >
                <p>اضف تقييمك</p>
              </button>
            </div>
            <div className={_css(styles, "info")} id="info">
              {Object.keys(product.details).map((d, index) => {
                return (
                  <div className={_css(styles, "product-detail")} key={index}>
                    <p>{d}</p>
                    <p>{product.details[d]}</p>
                  </div>
                );
              })}
            </div>
            <div className={_css(styles, "reviews")} id="reviews">
              {_comments.length == 0 && (
                <div className={_css(styles, "review-info")}>
                  <p>لا توجد تعليقات حتى الآن</p>
                </div>
              )}
              {_comments.map((comment, index) => {
                return (
                  <div className={_css(styles, "review")} key={index}>
                    <div className={_css(styles, "review-header center")}>
                      <div className={_css(styles, "profile-image")}>
                        <img
                          src={
                            comment.user.image ||
                            getImage("default-profile-picture.png")
                          }
                          alt=""
                        />
                      </div>
                      <p className={_css(styles, "profile-name")}>
                        {comment.user.displayName}
                      </p>
                      <div className={_css(styles, "profile-info")}>
                        <p>{comment.user.role.name}</p>
                        <p>{comment.user.entity.details.displayName}</p>
                      </div>
                    </div>
                    <div className={_css(styles, "review-content")}>
                      <p>{comment.content}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className={_css(styles, "add-review")} id="add-review">
              <div className={_css(styles, "review-title")}>
                <p>شكرا لرغبتك في ترك تعليق</p>
                <i className={_css(styles, "fa-solid fa-hands-praying")}></i>
              </div>
              <div className={_css(styles, "review-info")}>
                <p>
                  مشاركة تجربتك مع الآخرين يساعدنا على تطوير خدماتنا وتعريق
                  العملاء الأخرين بنا
                </p>
              </div>
              <div className={_css(styles, "review-content")}>
                <textarea
                  id="comment-area"
                  placeholder="يعجبني في هذا المنتج ...."
                />
              </div>
              <div className={_css(styles, "review-controls")}>
                <button
                  className={_css(styles, "center opacity-active")}
                  onClick={() => onCommentSend()}
                >
                  <i className={_css(styles, "fa-solid fa-arrow-right")} />
                  <p>أرسل تعليقك</p>
                </button>
              </div>
            </div>
          </section>
        </section>
      </div>
    </>
  );
};

export default SupplierPage;

export const getServerSideProps = async (context) => {
  return {
    props: JSON.parse(context.query.data),
  };
};
