import React from 'react'
import './App.css'
import Navbar from './components/navbar'
import Newpost from './components/newpost'
import avatar from './assets/avatar.webp'
import map from './assets/map.png'
import calendar from './assets/calendar.png'
import addImage from './assets/addimage.png'

const App = () => {

  return (
    <div>
      <Navbar />
      <div className="newPostCard">
        <div className="addPost">
          <img src={avatar} alt="" className='avatar' />
          <div className="postForm">

            <input type="text" placeholder="What's on your mind?" className="postInput"/>

            <label htmlFor="file">
              <img src={addImage} alt="" className='fileImages' />
              <img src={map} alt="" className='fileImages'  />
              <img src={calendar} alt="" className='fileImages'  />
              <button>Send</button>

            </label>

            <input style={{display: "none"}} type="file" id="file"/>

          </div>
        </div>
      </div>
      {/* <Newpost /> */}
    </div>
  )
}

export default App