const items = [
  {
    id: '001',
    video: require('../../../assets/video/content/testvideo.mp4'),
  },
  {
    id: '002',
    video: require('../../../assets/video/content/testvideo2.mp4'),
  },
  {
    id: '003',
    video: require('../../../assets/video/content/testvideo.mp4'),
  },
  {
    id: '004',
    video: require('../../../assets/video/content/testvideo2.mp4'),
  },
];

function GetContent(){
  return (
    items
  );
}

export default GetContent;

