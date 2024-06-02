import { useState, Fragment } from "react";
import "./Hexagon.css";

const Hexagon = ({ src, title }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Fragment>
      <div 
        className="hexagon" 
        onMouseEnter={() => setIsHovered(true)} 
        onMouseLeave={() => setIsHovered(false)}
      >
        <img src={src} alt={title} />
        {isHovered && (
          <div className="hexagon-title-overlay">
            <p>{title}</p>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Hexagon;