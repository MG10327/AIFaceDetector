import React, {useEffect, useRef, useState}  from 'react'
import * as faceapi from 'face-api.js'


const Newpost = ({image}) => {
    const {url, width, height} = image;
    const [faces , setFaces] = useState([])

    const imgRef = useRef()
    const canvasRef = useRef()

    const handleImage = async () => {
      const detections = await faceapi.detectAllFaces(
        imgRef.current,
        new faceapi.TinyFaceDetectorOptions()
    )
    //   .withFaceLandmarks()
    //   .withFaceExpressions()
        setFaces(detections.map(d=>Object.values(d.box)))
    }

    const enter = () => {
        const ctx = canvasRef.current.getContext("2d")
        ctx.lineWidth = 5
        ctx.strokeStyle= "yellow"
        faces.map((face)=> ctx.strokeRect(...face))
    }

    useEffect( () => {
      const loadModels = () => {
        Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
          faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
          faceapi.nets.faceExpressionNet.loadFromUri("/models"),
        ])
        .then(handleImage)
        .catch((e) => console.log(e))
      }

    imgRef.current && loadModels()
    }, [])

  return (
    <div className='container'>

        <div className="left-side" style={{height,width}}>
            <img ref={imgRef} crossOrigin='anonymous' src={url} alt="" />
            <canvas
            width={width}
            height={height}
            ref={canvasRef}
            onMouseEnter={enter}
            ></canvas>
            {faces.map((face, i)=>(
                <input placeholder='Tag your friend' key={i} className='friendInput'/>
            ))}
        </div>
        <div className="right-side">
            <h1>Share your post</h1>
            <input type="text" placeholder="What's on your mind?" className='rightInput' />
            <button className='rightButton'>Send</button>
        </div>


  </div>
  )
}

export default Newpost