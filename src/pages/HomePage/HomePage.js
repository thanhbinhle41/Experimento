import React from 'react'
import { ChartData } from '../../components/HomePage/ChartData/ChartData';
import Connector from '../../components/HomePage/Connector/Connector';
import Publisher from '../../components/HomePage/Publisher/Publisher';
import { TableData } from '../../components/HomePage/TableData/TableData';
import styles from "./HomePage.module.scss";


const HomePage = () => {
    return (
    <div className={styles.container}>
        <div className={styles.body}>
            <div className={styles.body_item}>
                <Connector/>
            </div>
            <div className={styles.body_item}>
                <Publisher/>
            </div>
            <div className={styles.body_item}>
                <TableData/>
            </div>
            <div className={styles.body_item}>
                <ChartData/>
            </div>
        </div>
    </div>
    )
}

export default HomePage;
