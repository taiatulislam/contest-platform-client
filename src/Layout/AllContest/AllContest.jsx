import { useEffect, useState } from "react";
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

const AllContest = () => {
    const category = ['poster', 'photography', 'gaming', 'coding', 'uiux'];
    const [poster, setPoster] = useState([]);
    const [photography, setPhotography] = useState([]);
    const [gaming, setGaming] = useState([]);
    const [coding, setCoding] = useState([]);
    const [uiux, setUiux] = useState([]);

    useEffect(() => {
        fetch('/contest.json')
            .then(res => res.json())
            .then(data => {
                setPoster(data.filter(item => item.category === 'poster'))
                setPhotography(data.filter(item => item.category === 'photography'))
                setGaming(data.filter(item => item.category === 'gaming'))
                setCoding(data.filter(item => item.category === 'coding'))
                setUiux(data.filter(item => item.category === 'uiux'))
            })
    }, [])

    // Tabs
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        {
                            category.map((categoryName) => (
                                <Tab value={categoryName} key={categoryName} >
                                    <Typography variant="h5" component="div" sx={{ mb: 1 }} style={{ color: 'black' }}>
                                        {categoryName}
                                    </Typography>
                                </Tab>
                            ))
                        }
                    </Tabs>
                </Box>
            </Box >
        </div >
    );
};

export default AllContest;