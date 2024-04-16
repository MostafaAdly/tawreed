import React from 'react';
import styles from './css/SaveButton.module.css'
import { _css } from "../Helpers";

const SaveButton = ({ active = true, onSave }) => {

    return (
        !active ? null :
            <div className={_css(styles, 'controls center')}>
                <button className='center opacity-active' onClick={(e) => onSave(e)}>
                    <i className={_css(styles, 'fa-solid fa-floppy-disk')}></i>
                    <p>حفظ التعديلات</p>
                </button>
            </div>
    );
}

export default SaveButton;