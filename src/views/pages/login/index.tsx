// Import Next
import { NextPage } from 'next'

// Import React
import React, { useState } from 'react'
import CustomTextField from 'src/components/text-field'

// Import Mui
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Container,
  CssBaseline,
  Grid,
  Link,
  InputAdornment,
  IconButton
} from '@mui/material'

// Import components
import Icon from 'src/components/Icon'

// Form
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { EMAIL_REG, PASSWORD_REG } from 'src/configs/regex'

type TProps = {}

const LoginPage: NextPage<TProps> = () => {
  const [showPassword, setShowPassword] = useState(false)

  const schema = yup
    .object({
      email: yup.string().required('The field is required').matches(EMAIL_REG, 'The field is must email type'),
      password: yup
        .string()
        .required('The field is required')
        .matches(PASSWORD_REG, 'The password is contain character, special character, number')
    })
    .required()

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: ''
    },
    mode: 'onBlur'
  })

  const onSubmit = (data: { email: string; password: string }) => {
    console.log('data', data)
  }

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete='off'>
          <Box sx={{ mt: 2 }}>
            <Controller
              control={control}
              name='email'
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomTextField
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  placeholder='Input email'
                  error={Boolean(errors.email)}
                  helperText={errors.email?.message}
                />
              )}
            />
          </Box>

          <Box sx={{ mt: 2 }}>
            <Controller
              control={control}
              name='password'
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomTextField
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  placeholder='Input password'
                  error={Boolean(errors.password)}
                  helperText={errors.password?.message}
                  type={showPassword ? 'text' : 'password'}
                  id='password'
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end' onClick={() => setShowPassword(prev => !prev)}>
                        <IconButton>
                          {showPassword ? (
                            <Icon icon='material-symbols:visibility-outline' />
                          ) : (
                            <Icon icon='material-symbols:visibility-off-outline' />
                          )}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              )}
            />
          </Box>

          <FormControlLabel control={<Checkbox value='remember' color='primary' />} label='Remember me' />
          <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href='#' variant='body2'>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href='#' variant='body2'>
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  )
}

export default LoginPage
