import React from 'react'
import ClientHeader from './clientHeader'
import backgroundVideo from '../../assets/video/htqldt707.mp4'

export default function ClientPage() {
  return (
    <>
      <ClientHeader />
      <div style={{
        backgroundColor: 'white', marginTop: '64px', width: '100%',
        height: '873.6px', justifyContent: 'center', display: 'flex',
        alignItems: 'center'
      }}>
        <video
          src={backgroundVideo}
          autoPlay
          loop
          muted
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
    </>
  )
}
