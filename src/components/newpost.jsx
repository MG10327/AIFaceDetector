import React, {useEffect, useRef}  from 'react'
import * as faceapi from 'face-api.js'


const newpost = ({image}) => {
    const {url, width, height} = image

    const imgRef = useRef()
    const canvasRef = useRef()
  
    const handleImage = async () => {
      const detections = await faceapi
      .detectAllFaces(imgRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions()
  
      canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(imgRef.current)
      faceapi.matchDimensions(canvasRef.current, {
        width,
        height,
      })
  
      const resized = faceapi.resizeResults(detections, {
        width,
        height,
      })
  
      faceapi.draw.drawDetections(canvasRef.current, resized)
      faceapi.draw.drawFaceExpressions(canvasRef.current, resized)
      faceapi.draw.drawFaceLandmarks(canvasRef.current, resized)
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
            ></canvas>
        </div>
        <div className="right-side">
            <h1>Share your post</h1>
            <input type="text" placeholder="What's on your mind?" className='rightInput' />
            <button className='rightButton'>Send</button>
        </div>


  </div>
  )
}

export default newpost