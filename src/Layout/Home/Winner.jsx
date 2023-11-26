import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Typography } from "@mui/material";

const Winner = () => {

    return (
        <div style={{ textAlign: 'center' }}>
            <Typography variant="h3" textAlign='center' component="div" sx={{ mt: 10 }}>
                Advertisement
            </Typography>
            <Carousel style={{ height: '500px' }} >
                <div>
                    <img src='https://i.ibb.co/mHLv0jt/ads2-copy.jpg' alt='carousal' />
                </div>
                <div>
                    <img src='https://i.ibb.co/Zx6cPWL/ads1-copy.jpg' alt='carousal' />
                </div>
                <div>
                    <img src='https://i.ibb.co/mHLv0jt/ads2-copy.jpg' alt='carousal' />
                </div>
                <div>
                    <img src='https://i.ibb.co/Zx6cPWL/ads1-copy.jpg' alt='carousal' />
                </div>
            </Carousel>
        </div>
    );
};

export default Winner;