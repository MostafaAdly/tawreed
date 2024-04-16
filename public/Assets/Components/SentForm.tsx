import React from 'react';
import styles from './css/SentForm.module.css'
import { _css } from "../Helpers";

const SentForm = ({ active = false, title = "تم الإرسال بنجاح", text = "العودة الآن", callback, error = false }) => {

    const onClick = (e) => {
        e.preventDefault();
        if (callback) {
            callback();
        }
    }

    return (active ?
        <div className={_css(styles, 'sent-form-background center')} onClick={(e) => onClick(e)}>
            <div className={_css(styles, 'sent-form')}>
                <div className={_css(styles, 'inner-container')}>
                    <div className={_css(styles, `icon${error ? " error" : ""}`)}>
                        <i className={_css(styles, 'fa-solid fa-circle-check')}></i>
                    </div>
                    <div className={_css(styles, 'title center')}>
                        <p>{title}</p>
                    </div>
                    <div className={_css(styles, 'text')}>
                        <p>{text}</p>
                    </div>
                </div>
            </div>
        </div> : null
    );
}

export default SentForm;