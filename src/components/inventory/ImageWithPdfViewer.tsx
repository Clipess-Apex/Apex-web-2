import React from 'react';

interface Props{
    imageUrl2:string;
    pdfUrl:string;
}

const ImageWithPDFViewer:React.FC<Props> = ({ imageUrl2,  pdfUrl }) => {
  const handleImageClick = () => {
    window.open(pdfUrl, '_blank');
  };

  return (
    <div>
      <img src={imageUrl2} alt="PDF thumbnail" onClick={handleImageClick} height={"80px"} width={"70px"} />
    </div>
  );
};

export default ImageWithPDFViewer;
