import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from './card';
import '../css/AccountData.css';
const AccountData = () => {
    return (
        <div classNameName="container">
            <div classNameName=" myContainer">
                <div classNameName=" cardContainer">
                    < Card title="Total Amount" amount={500} colour="blue" />
                </div>
                <div classNameName=" cardContainer">
                    < Card title="Income" amount={500} colour="blue" />
                </div>
                <div classNameName=" cardContainer">
                    < Card title="Expance" amount={500} colour="blue" />
                </div>
            </div>
        </div>
    );
}

export default AccountData;