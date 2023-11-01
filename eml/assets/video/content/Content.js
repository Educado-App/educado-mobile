import video1 from '../../../assets/video/content/testvideo.mp4';
import video2 from '../../../assets/video/content/testvideo2.mp4';

const items = [
  {
    id: '001',
    video: video1,
  },
  {
    id: '002',
    video: video2,
  },
  {
    id: '003',
    video: video1,
  },
  {
    id: '004',
    video: video2,
  },
];

function GetContent() {
  return (
    items
  );
}

export default GetContent;