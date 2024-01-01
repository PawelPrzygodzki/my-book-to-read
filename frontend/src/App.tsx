import React, {Suspense} from 'react';
import {Spin} from 'antd';
import './App.scss';
import AppRoutes from "./AppRoutes";

function App() {
    return (
        <Suspense fallback={<Spin spinning/>}>
            <div className="App">
                <AppRoutes/>
            </div>
        </Suspense>
    );
}

export default App;
