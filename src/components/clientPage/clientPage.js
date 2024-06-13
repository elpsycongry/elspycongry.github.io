import React from 'react'
import ClientHeader from './clientHeader'
import backgroundVideo from '../../assets/video/htqldt707.mp4'
import './clientPage.css'

export default function ClientPage() {
  return (
    <>
      <ClientHeader />
      <div className='client-page-video-div'>
        <video
        className='client-page-video'
          src={backgroundVideo}
          autoPlay
          loop
          muted
        />
      </div>
    </>
  )
}
