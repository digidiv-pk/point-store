import React from 'react';
import images from '../../../assets/img';

function InstructionalVideos(): JSX.Element {
  return (
    <>
      <div className="col-6 videos-header">
        <p>Instructional Videos</p>
      </div>
      <div className="col-6 clear-all">
        <a href="#">View All</a>
      </div>

      <div className="video-main">
        <ul>
          <li>
            <div className="videos v-content">
              <img src={images.playIcon} />
            </div>
            <p>Important to Know</p>
          </li>
        </ul>
      </div>
    </>
  );
}
export default InstructionalVideos;
