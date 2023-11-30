import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Grid, Typography } from "@mui/material";
import { AuthContext } from '../../Providers/AuthProvider';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell } from 'recharts';

const Dashboard = () => {

    const { user, pages } = React.useContext(AuthContext);
    const navigate = useNavigate();
    const [win, setWin] = useState();
    const [participate, setParticipate] = useState();

    const handleMenu = (path) => {
        navigate(`${path}`)
    }

    useEffect(() => {
        fetch(`https://contest-platform-server-rho.vercel.app/allContest`)
            .then(res => res.json())
            .then(data => setWin(data.filter(data => data.winner === user?.email)))
    }, [])

    useEffect(() => {
        fetch(`https://contest-platform-server-rho.vercel.app/user/${user?.email}`)
            .then(res => res.json())
            .then(data => setParticipate(data))
    }, [])

    const data = [
        {
            "name": "win",
            "value": win?.length,
        },
        {
            "name": "participated",
            "value": participate?.length,
        }
    ];

    const colors = ['#0766AD', '#00A9FF'];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({
        cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central">
                {`${(percent * 100).toFixed(1)}%`}
            </text>
        );
    }

    return (
        <div>
            <Grid container>
                <Grid item xs={12} sm={2}>
                    <Box sx={{ width: '100%', height: '97vh', bgcolor: 'orange' }}>
                        <nav aria-label="main mailbox folders">
                            <List >
                                <ListItem>
                                    <ListItemButton onClick={() => handleMenu('/participated')}>
                                        <ListItemText primary="My Participated Contest" style={{ textAlign: "center" }} />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem>
                                    <ListItemButton onClick={() => handleMenu('/winning')}>
                                        <ListItemText primary="My Winning Contest" style={{ textAlign: "center" }} />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem>
                                    <ListItemButton onClick={() => handleMenu('/updateProfile')}>
                                        <ListItemText primary="Update Profile" style={{ textAlign: "center" }} />
                                    </ListItemButton>
                                </ListItem>
                            </List>
                        </nav>
                        <Divider />
                        <nav aria-label="secondary mailbox folders">
                            <List>
                                {
                                    pages.map((page) =>
                                    (
                                        <ListItem key={page.name}>
                                            <ListItemButton onClick={() => handleMenu(page.path)}>
                                                <ListItemText primary={page.name} style={{ textAlign: "center" }} />
                                            </ListItemButton>
                                        </ListItem>
                                    ))
                                }
                            </List>
                        </nav>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={10} sx={{ mt: 5 }}>
                    <Typography variant='h3' textAlign="center">
                        Welcome to the user dashboard.
                    </Typography>
                    <Box style={{ margin: 'auto' }}>
                        <PieChart width={300} height={250}>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={renderCustomizedLabel}
                                outerRadius={120}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {
                                    data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={colors[index]} />
                                    ))
                                }
                            </Pie>
                        </PieChart>
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
};

export default Dashboard;