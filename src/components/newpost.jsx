import React, {useEffect, useRef}  from 'react'
import * as faceapi from 'face-api.js'


const newpost = () => {
    const imgRef = useRef()
    const canvasRef = useRef()
  
    const handleImage = async () => {
      const detections = await faceapi
      .detectAllFaces(imgRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions()
  
      canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(imgRef.current)
      faceapi.matchDimensions(canvasRef.current, {
        width: 940,
        height: 650,
      })
  
      const resized = faceapi.resizeResults(detections, {
        width: 940,
        height: 650,
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
    <div className='app'>
        {/* <img src="https://images.pexels.com/photos/1231230/pexels-photo-1231230.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt=""
        width="940"
        height="650"
        ref={imgRef}
        crossOrigin='anonymous'/> */}

        <img src="" alt="" />

        <canvas
        width="940"
        height="650"
        ref={canvasRef}
        ></canvas>
  </div>
  )
}

export default newpost