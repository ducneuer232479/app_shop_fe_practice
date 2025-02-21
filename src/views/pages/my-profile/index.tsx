/* eslint-disable @typescript-eslint/no-unused-vars */
// ** Import Next
import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'

// ** Import React
import React, { useState } from 'react'
import CustomTextField from 'src/components/text-field'

// ** Import Mui
import {
  Box,
  Button,
  Typography,
  CssBaseline,
  InputAdornment,
  IconButton,
  useTheme,
  Card,
  Grid,
  Avatar
} from '@mui/material'

// ** Import components
import Icon from 'src/components/Icon'

// Form
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { EMAIL_REG, PASSWORD_REG } from 'src/configs/regex'

// ** Images
import LoginLight from '/public/images/login-light.png'
import LoginDark from '/public/images/login-dark.png'

type TProps = {}

type TDefaultValue = {
  email: string
  password: string
  confirmPassword: string
}

const MyProfilePage: NextPage<TProps> = () => {
  // ** State
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // ** Theme
  const theme = useTheme()

  const schema = yup.object().shape({
    email: yup.string().required('The field is required').matches(EMAIL_REG, 'The field is must email type'),
    password: yup
      .string()
      .required('The field is required')
      .matches(PASSWORD_REG, 'The password is contain character, special character, number'),
    confirmPassword: yup
      .string()
      .required('The field is required')
      .matches(PASSWORD_REG, 'The password is contain character, special character, number')
      .oneOf([yup.ref('password'), ''], 'The confirm password is must match with password')
  })

  const defaultValues: TDefaultValue = {
    email: '',
    password: '',
    confirmPassword: ''
  }

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
    mode: 'onBlur'
  })

  const onSubmit = (data: TDefaultValue) => {
    console.log('data', data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete='off'>
      <Card sx={{ backgroundColor: theme.palette.background.paper, borderRadius: '15px', p: 4 }}>
        <Grid container spacing={5}>
          <Grid container item md={6} xs={12} spacing={5}>
            <Grid item md={12} xs={12}>
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                  gap: 2
                }}
              >
                <Avatar sx={{ width: 100, height: 100 }}>
                  {/* {user?.avatar ? (
                  <Image src={user?.avatar || ''} alt='' style={{ height: 'auto', width: 'auto' }} />
                ) : (
                  <Icon icon='ph:user-thin' />
                )} */}
                  <Icon icon='ph:user-thin' />
                </Avatar>
                <Button variant='outlined' sx={{ width: 'auto' }}>
                  Tải lên
                </Button>
              </Box>
            </Grid>
            <Grid item md={6} xs={12}>
              <Controller
                control={control}
                name='email'
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomTextField
                    required
                    fullWidth
                    label='Email Address'
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    placeholder='Input email'
                    error={Boolean(errors.email)}
                    helperText={errors.email?.message}
                  />
                )}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Controller
                control={control}
                name='email'
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomTextField
                    required
                    fullWidth
                    label='Email Address'
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    placeholder='Input email'
                    error={Boolean(errors.email)}
                    helperText={errors.email?.message}
                  />
                )}
              />
            </Grid>
          </Grid>
          <Grid container item md={6} xs={12} spacing={5}>
            <Grid item md={6} xs={12}>
              <Controller
                control={control}
                name='email'
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomTextField
                    required
                    fullWidth
                    label='Email Address'
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    placeholder='Input email'
                    error={Boolean(errors.email)}
                    helperText={errors.email?.message}
                  />
                )}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Controller
                control={control}
                name='email'
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomTextField
                    required
                    fullWidth
                    label='Email Address'
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    placeholder='Input email'
                    error={Boolean(errors.email)}
                    helperText={errors.email?.message}
                  />
                )}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Controller
                control={control}
                name='email'
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomTextField
                    required
                    fullWidth
                    label='Email Address'
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    placeholder='Input email'
                    error={Boolean(errors.email)}
                    helperText={errors.email?.message}
                  />
                )}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Controller
                control={control}
                name='email'
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomTextField
                    required
                    fullWidth
                    label='Email Address'
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    placeholder='Input email'
                    error={Boolean(errors.email)}
                    helperText={errors.email?.message}
                  />
                )}
              />
            </Grid>
          </Grid>
        </Grid>
      </Card>

      {/* <Box sx={{ mt: 2, width: '300px' }}>
        <Controller
          control={control}
          name='password'
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomTextField
              required
              fullWidth
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

      <Box sx={{ mt: 2, width: '300px' }}>
        <Controller
          control={control}
          name='confirmPassword'
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomTextField
              required
              fullWidth
              label='Confirm password'
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              placeholder='Enter confirm password'
              error={Boolean(errors.confirmPassword)}
              helperText={errors.confirmPassword?.message}
              type={showConfirmPassword ? 'text' : 'password'}
              id='password'
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end' onClick={() => setShowConfirmPassword(prev => !prev)}>
                    <IconButton>
                      {showConfirmPassword ? (
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
      </Box> */}

      <Box sx={{ display: 'flex', justifyContent: 'end' }}>
        <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2 }}>
          Thay đổi
        </Button>
      </Box>
    </form>
  )
}

export default MyProfilePage
