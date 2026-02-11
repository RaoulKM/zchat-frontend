import React from 'react'
import { FileQuestionIcon, Home, Icon, Smile } from 'lucide-react'
import { Link } from 'react-router-dom';


const LandingPage = () => {
  return (
    <div className="landing-page-container">
      <div className="landing-page-hero">
        <view className="landing-page-header">
          <ul>
            <li>
              {" "}
              <Link to="#">Home</Link> <Home />{" "}
            </li>
            <li>
              {" "}
              <Link to="#About">About</Link> <FileQuestionIcon />{" "}
            </li>
            <li>
              {" "}
              <Link>Titre 3</Link> <Home />{" "}
            </li>
          </ul>
           <Link to="/login">Se Connecter </Link>
        </view>
      </div>
    </div>
  );
}

export default LandingPage