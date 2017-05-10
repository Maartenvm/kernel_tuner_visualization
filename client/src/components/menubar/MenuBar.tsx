import * as React from 'react';

import { connect } from 'react-redux';

import { Content, Drawer, Header, Layout, Navigation } from 'react-mdl';

import { LogoBox } from '../';

import './MenuBar.css';

interface IMenuBarDispatchProps {}

export interface IMenuBar {}

export class UnconnectedMenuBar extends React.Component<IMenuBar & IMenuBarDispatchProps, { }> {
    static mapStateToProps() {
        return {};
    }

    static mapDispatchToProps() { //  dispatch: Dispatch<GenericAction>) {
        return {};
    }

    constructor() {
        super();
    }

    render() {
        return (
            <div className={'main-menu-bar'}>
                <Layout>
                    <Header title={<span><strong>Kernel Tuner Visualization</strong></span>}>
                        <Navigation>
                            <LogoBox />
                        </Navigation>
                    </Header>

                    <Drawer title="DANGER Zone">
                        <Navigation />
                        {/*</Navigation>*/}
                    </Drawer>

                    <Content className={'content-grid'} />
                    {/*</Content>*/}
                </Layout>
            </div>
        );
    }
}

// Export just the connected component
export const MenuBar = connect(UnconnectedMenuBar.mapStateToProps,
                               UnconnectedMenuBar.mapDispatchToProps)(UnconnectedMenuBar);
