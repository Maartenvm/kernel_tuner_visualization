import * as React from 'react';

import nlesclogo from './NLESClogo.png';

import './LogoBox.css';

export class LogoBox extends React.Component<any , { }> {
    constructor() {
        super();
    }

    render() {
        return (
            <div className={'logo-box'}>
                <img className={'logo-nlesc'} src={nlesclogo} alt={'Netherlands eScience Center Logo'} />
            </div>
        );
    }
}
