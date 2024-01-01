import React, {FC} from 'react';
import {Layout} from 'antd';
import classes from './AppContent.module.scss';

const {Content} = Layout;

type Props = {
    children: React.ReactElement
};
const AppContent: FC<Props> = ({children}) => (
    <Content className={classes.container}>
        {children}
    </Content>
);

export default AppContent;
