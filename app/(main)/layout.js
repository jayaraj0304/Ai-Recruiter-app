import React from 'react'
import DashboardProvider from './providerr'
import Provider from '../provider'

function DashboardLayout({children}){
    return (
        <div className='bg-secondary'>
            <DashboardProvider>
                <div className='p-10'>
                <Provider>
                {children}
                </Provider>
                </div>
                </DashboardProvider>
                </div>
    )
}
export default DashboardLayout