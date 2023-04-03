import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from '../auth/pages/LoginPage'
import CalendarPage from '../calendar/pages/CalendarPage'
import { getEnvVariables } from '../helpers/getEnvVariables'

export const AppRouter = () => {

    const authStatus = 'authenticated'

    // console.log(getEnvVariables());        

    return (
        <Routes>
            {/* Todo */}
            {
                (authStatus === 'not-authenticated' 
                ? <Route path="/auth/*" element={<LoginPage/>}/> 
                : <Route path="/*" element={<CalendarPage/>}/> )
            }
            {/* <Route path="/auth/*" element={<LoginPage/>}/>
            <Route path="/*" element={<CalendarPage/>}/> */}
            <Route path="/*" element={<Navigate to='/auth/login'/>}/>
        </Routes>
    )
}
