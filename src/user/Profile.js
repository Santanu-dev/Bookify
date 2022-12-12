import React from 'react'
import Base from '../core/Base'

const Profile = () => {
  return (
    <Base theme={localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light'}>
        
    </Base>
  )
}

export default Profile;
