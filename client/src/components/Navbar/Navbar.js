import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Toolbar, Avatar, Button, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import decode from 'jwt-decode';
import { searchPosts, getPosts } from '../../actions/posts'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';

import olxlogo from '../../images/logo.svg';
import * as actionType from '../../constants/actionTypes';
import useStyles from './styles';
import Media from 'react-media';

const Navbar = () => {
  const category = [{title:''},{ title: `Vehicles` }, { title: `Property` }, { title: `Electronics` }, { title: `Services` }];
  const [search, setSearch] = useState("");
  const [cat,setCat]=useState({title:""});
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts)
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();
  const searchPost = () => {
    dispatch(searchPosts(search+"th3"+cat.title));
    console.log(search+cat.title)
    setSearch("");
  }
  const updateSearch = (event) => {
    const val = event.target.value;
    setSearch(val);
  }
  const logout = () => {
    dispatch({ type: actionType.LOGOUT });

    history.push('/auth');

    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  return (
    <>
      <Media query="(max-width:600px)">
        {
          matches => {
            return matches ? (
              <>
                {/* <AppBar className={classes.appBar2} position="static" color="inherit">
                  <div className={classes.brandContainer}>

                  </div>
                </AppBar> */}

                <AppBar className={classes.appBarMobile} position="static" color="inherit">
                  <div>
                    <Typography component={Link} onClick={dispatch(getPosts())} to="/" className={classes.heading} variant="h3" align="center">
                      <img className={classes.image} src={olxlogo} alt="icon" height="60" />
                    </Typography>
                    <Autocomplete
                        id="combo-box-demo"
                        options={category}
                        getOptionLabel={(option) => search !== "" ? (option.title==""?search:"find " + search + " in " + option.title) : option.title}
                        className={classes.SearchText}
                        onChange={(e,v)=>setCat(v)}
                        renderInput={(params) => <TextField variant="outlined" style={{width:'320px'}} fullWidth {...params} value={""} label="Search" onChange={updateSearch} />}
                      />
                    <Button style={{paddingLeft:'290px'}} onClick={searchPost}><SearchOutlinedIcon /></Button>

                  </div>
                  <div className={classes.button}>{
                    !user?.result ? (
                      <Button  component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                    ) :
                      (
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                      )
                  }</div>
                </AppBar>
                {user?.result ? (
                  <AppBar className={classes.appBar} position="static" color="inherit">
                    <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
                    <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
                  </AppBar>
                ) : null}
              </>
            )
              : (
                <>
                  {/* <AppBar className={classes.appBar} position="static" color="inherit">
                    <div className={classes.brandContainer}>
                      
                    </div>
                  </AppBar> */}
                  <AppBar className={classes.appBar2} position="static" color="inherit">

                    <div className={classes.SearchBar}>
                      <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">
                      <img className={classes.image} src={olxlogo} alt="icon" height="60" />
                      </Typography>
                      <Autocomplete
                        className={classes.SearchBar}
                        id="combo-box-demo"
                        options={category}
                        getOptionLabel={(option) => search !== "" ? (option.title==""?search:"find " + search + " in " + option.title) : option.title}
                        style={{ minWidth: "200px", maxWidth: "300px" }}
                        onChange={(e,v)=>setCat(v)}
                        renderInput={(params) => <TextField variant="outlined" style={{width:'1000px'}} {...params} value={""} label="Search" onChange={updateSearch} />}
                      />
                      <Button onClick={searchPost}><SearchOutlinedIcon /></Button>
                    </div>

                    {

                    }
                    <Toolbar className={classes.toolbar}>
                      {user?.result ? (
                        <div className={classes.profile}>
                          <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
                          <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
                          <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                        </div>
                      ) : <Button component={Link} variant="contained" to="/auth" color="primary">Sign In</Button>
                      }
                    </Toolbar>
                  </AppBar>
                </>)
          }
        }
      </Media>

    </>
  );
};

export default Navbar;