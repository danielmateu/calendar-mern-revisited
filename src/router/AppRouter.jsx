import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from '../auth/pages/LoginPage'
import CalendarPage from '../calendar/pages/CalendarPage'
import { getEnvVariables } from '../helpers/getEnvVariables'
import { useAuthStore } from '../hooks/useAuthStore'
import { useEffect } from 'react'

export const AppRouter = () => {

    // console.log(getEnvVariables());        
    // const authStatus = 'not-authenticated'
    const { status, checkAuthToken } = useAuthStore()

    useEffect(() => {
        checkAuthToken()
    }, [])

    if(status === 'checking') {
        return <div>Checking...</div>
    }




    return (
        <Routes>
            {/* Todo */}
            {
                (status === 'not-authenticated'
                    ? <Route path="/auth/*" element={<LoginPage />} />
                    : <Route path="/*" element={<CalendarPage />} />)
            }
            {/* <Route path="/auth/*" element={<LoginPage/>}/>
            <Route path="/*" element={<CalendarPage/>}/> */}
            <Route path="/*" element={<Navigate to='/auth/login' />} />
        </Routes>
    )
}
