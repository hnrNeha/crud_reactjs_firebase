import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Grid,Paper, Avatar, TextField, Button, Typography } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';


function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) navigate("/");
  }, [user, loading, navigate]);

  const paperStyle={padding :20,height:'70vh',width:280, margin:"20px auto"}
  const avatarStyle={backgroundColor:'#1bbd7e'}
  const btnstyle={margin:'8px 0'}

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align='center'>
          <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
          <h2>Sign In</h2>
        </Grid>
        <TextField 
          label='Email'
          placeholder='Enter email'
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
          fullWidth required
        />
        <TextField
          label='Password'
          placeholder='Enter password'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
          fullWidth required
        />
        <Button 
          type='submit'
          color='primary'
          variant="contained"
          style={btnstyle}
          onClick={() => logInWithEmailAndPassword(email, password)} 
          fullWidth>
            Sign in
        </Button>
        <Button
          type='submit'
          color='secondary'
          variant="contained"
          style={btnstyle}
          onClick={signInWithGoogle}
          fullWidth>
            Sign in with Google    
        </Button>
        <Typography >Don't have an account ?
          <Link to="/register">Register</Link>
        </Typography>
      </Paper>
    </Grid>
  )
}


export default Login;