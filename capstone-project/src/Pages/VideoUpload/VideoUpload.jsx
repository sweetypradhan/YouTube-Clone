import React from 'react';
import '../VideoUpload/VideoUpload.css';
import { Link } from 'react-router-dom';

const VideoUpload = () => {
  return (
    <div className='videoUpload'>
      <div className="uploadBox">
        <div className="uploadVideoTitle">
            Upload Video
        </div>

        <div className="uploadForm">
            <input type='text' placeholder='Title of video' className='uploadFormInputs' />
            <input type='text' placeholder='Description' className='uploadFormInputs' />
            <input type='text' placeholder='Category' className='uploadFormInputs' />
            <div>Thumbnail <input type='file' accept='image/*' /></div>
            <div>Video <input type='file' accept='video/mp4, video/webm, video/*' /></div>
        </div>

        <div className="uploadBtns">
            <div className="uploadBtn-form">Upload</div>
            <Link to={'/'} className="uploadBtn-form">Home</Link>
        </div>

      </div>
    </div>
  )
}

export default VideoUpload
