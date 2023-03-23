import React from "react";
import {
    Box,
    Card,
    CardActions,
    CardContent,
    Button,
    FormControl,
    FormGroup,
    FormHelperText,
    InputLabel,
    Input,
} from '@mui/material';

const Login = () => {
    return (
        <Card>
            <CardContent>
                <FormControl>
                    <FormGroup controlId="formBasicEmail">
                        <InputLabel>Email address*</InputLabel>
                        <Input id="testerInput" />
                        <FormHelperText>
                            We'll never share your email with anyone else.
                        </FormHelperText>
                    </FormGroup>
                </FormControl>
                <FormControl>
                    <FormGroup controlId="formBasicPassword">
                        <InputLabel>Password*</InputLabel>
                        <Input id="testerInput2" />
                    </FormGroup>
                </FormControl>
                <CardActions>
                    <Button type="submit">
                        Submit
                    </Button>
                </CardActions>
            </CardContent>
        </Card>
    )
}

export default Login;