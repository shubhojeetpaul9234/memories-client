import React,{ useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';

import useStyles from './styles';
import Input from './Input';
import { AUTH } from '../../constants/actionTypes';
import Icon from './icon';
import { signin, signup } from '../../actions/auth';

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUp = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [form, setFrom] = useState(initialState);

    const handleShowPassword = () => setShowPassword(!showPassword);

    const handleSubmit =(e) => {
        e.preventDefault();

        if(isSignup) {
            dispatch(signup(form, history))
        } else {
            dispatch(signin(form, history))
        }
    }

    const handleChange = (e) => {
        setFrom({ ...form, [e.target.name]: e.target.value });
    }

    const switchMode = () => {
        setFrom(initialState);
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    }

    const googleSuccess = async (res) => {
        const result = res?.profileObj; //this is optional chaining operator, if the res dosent exist then it desent throws error, it assigns result to undefined
        const token = res?.tokenId;

        try {
            dispatch({ type: AUTH, data: { result, token }});

            history('/');
        } catch (error) {
            console.log(error);
        }
    }

    const googleError = () => {
        alert('Google Sign In was unsuccessful. Try Again Later');
    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={6}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        { isSignup && (       //The ternary operator where the false statement results to return null, can be written this way
                            <>
                                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half/>
                                <Input name="lastName" label="Last Name" handleChange={handleChange} half/>
                            </>
                        )}
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" :"password"} handleShowPassword={handleShowPassword} />
                        { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChnage={handleChange} type="password" /> }
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        { isSignup ? 'Sign Up' : 'Sign In' }
                    </Button>
                    <GoogleLogin 
                        clientId="690952731190-7t1c6peijhaqb2h3rvtql11dhk9dmdmu.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <Button 
                                className={classes.googleButton} 
                                color="primary" 
                                fullWidth 
                                onClick={renderProps.onClick} 
                                disabled={renderProps.disabled} 
                                startIcon={<Icon />}  
                                variant="contained" 
                            >
                                Google Sign In
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleError}
                        cookiePolicy="single_host_origin"
                    />
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                { isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default SignUp;
