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
                    <img src='https://i.ibb.co/8jfJxGb/Untitled-3.jpg' alt='carousal' />
                </div>
                <div>
                    <img src='https://i.ibb.co/2PvGb8r/Untitled-2.jpg' alt='carousal' />
                </div>
                <div>
                    <img src='https://i.ibb.co/WxGSdwq/Untitled-1.jpg' alt='carousal' />
                </div>
            </Carousel>
        </div>
    );
};

export default Winner;