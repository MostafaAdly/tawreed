
import React from 'react';
import { _css } from '../Helpers';
import styles from './css/Filter.module.css'

const Filter = ({ searchObject, enabledFilters, callback, type = "", setEnabledFilters }) => {
    const onFilter = (target, state) => {
        if (enabledFilters.includes(state)) {
            setEnabledFilters(enabledFilters.filter(filter => filter != state));
        } else {
            setEnabledFilters([...enabledFilters, state]);
        }
    }

    return (
        <div className={_css(styles, 'filters')}>
            <div
                className={_css(styles, 'icon box-shadow-hover center' + (!enabledFilters.length ? " checked" : ""))}
                onClick={() => setEnabledFilters([])}
            >
                <i className={_css(styles, 'fa-solid fa-filter')}></i>
            </div>
            <div className={_css(styles, 'self')}>
                {applyFilterComponent(searchObject, enabledFilters, type, callback || onFilter)}
            </div>
        </div>
    );
}

const applyFilterComponent = (searchObject, enabledFilters, type, onclick) => {
    return (
        Object.keys(searchObject)
            .filter(state => state.toLowerCase().startsWith(type.toLowerCase())).map((state, index) => {
                return (
                    <div
                        className={_css(styles, 'filter box-shadow-hover' + (enabledFilters.includes(state) ? " checked" : ""))}
                        key={index}
                        onClick={({ target }: any) => onclick(target, state)}
                    >
                        <p>{(searchObject as any)[state]}</p>
                        <div className={_css(styles, 'control')}>
                            <div className={_css(styles, 'check')}>
                                <i className={_css(styles, 'fa-solid fa-circle-check')}></i>
                            </div>
                            <div className={_css(styles, 'exit')}>
                                <i className={_css(styles, 'fa-solid fa-circle-xmark')}></i>
                            </div>
                        </div>
                    </div>
                );
            })
    )
}


export default Filter;