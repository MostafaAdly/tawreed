
import React from 'react'
import S_HeaderComponent from '../../Supplier/Global/HeaderComponent';

const A_HeaderComponent = ({ user }) => {
    return (
        <S_HeaderComponent user={user} entity={null} title={"لوحة التحكم"} icon='truck-fast' />
        // <>
        // </>
    );
}

export default A_HeaderComponent;