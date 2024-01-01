import React, {FC} from 'react';
import {Layout} from 'antd';
import AppContent from '../components/AppContent/AppContent';
import classes from './DefaultLayout.module.scss';
import AppHeader from "../components/AppHeader";

type Props = {
    children: React.ReactElement
};
const DefaultLayout: FC<Props> = ({children}) => (
    <Layout className={classes.main}>
        <Layout className={classes.content}>
            <AppHeader/>
            <AppContent>
                {children}
            </AppContent>
        </Layout>
    </Layout>
);

export default DefaultLayout;
