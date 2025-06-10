import DashboardContent from '@/components/DashboardContent';
import Navbar from '@/components/Navbar';
import { UserButton } from '@clerk/nextjs';
import React from 'react'

const DashboardPage = () => {
  return (
    <>
      <Navbar/>
      <DashboardContent/>
    </>
  )
}

export default DashboardPage;