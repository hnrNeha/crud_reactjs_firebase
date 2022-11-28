import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { Grid,Paper, Avatar, TextField, Button, Typography } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {
  auth,
  registerWithEmailAndPassword
} from "../../firebase";
import { toast } from "react-toastify";


function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const paperStyle={padding :20,height:'70vh',width:280, margin:"20px auto"}
  const avatarStyle={backgroundColor:'#1bbd7e'}
  const btnstyle={margin:'8px 0'}
  const register = () => {
    if (!name) toast("Please enter name");
    registerWithEmailAndPassword(name, email, password);
  };
  useEffect(() => {
    if (loading) return;
    if (user) navigate("/");
  }, [user, loading, navigate]);
  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align='center'>
          <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
          <h2>Sign In</h2>
        </Grid>
        <TextField
          label='Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name" 
          fullWidth required
        />
        <TextField
          label='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
          type='email'
          fullWidth required
        />
        <TextField
          label='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type='password'
          fullWidth required
        />
        <Button
          type='submit'
          color='primary'
          onClick={register}
          variant="contained"
          style={btnstyle} 
          fullWidth>
            Sign up
        </Button>
        <Typography >Do you have an account ?
          <Link to="/login">Login</Link>
        </Typography>
      </Paper>
    </Grid>
  );
}
export default Register;