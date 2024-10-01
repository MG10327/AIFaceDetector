import React, { useEffect, useState } from 'react'
import './App.scss'
import Navbar from './components/navbar'
import Newpost from './components/newpost'
import avatar from './assets/avatar.webp'
import map from './assets/map.png'
import calendar from './assets/calendar.png'
import addImage from './assets/addimage.png'

const App = () => {

  const [file, setFile] = useState()
  const [image, setImage] = useState()

  useEffect(()=> {
    const getImage = () => {
      const img = new Image()
      img.src = URL.createObjectURL(file)
      img.onload = () => {
        setImage({
          url: img.src,
          width: img.width,
          height: img.height
        })
      }
    }
    file && getImage()

  }, [file])

  return (
    <div>
      <Navbar />
      {image ?(<Newpost image={image}/>) : (
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

              <input onChange={(e) => setFile(e.target.files[0])} style={{display: "none"}} type="file" id="file"/>
  
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App