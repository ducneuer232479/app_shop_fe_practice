/* eslint-disable @typescript-eslint/no-unused-vars */
// ** Import Next
import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'

// ** Import React
import React, { useEffect, useState } from 'react'
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

// Form
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { EMAIL_REG, PASSWORD_REG } from 'src/configs/regex'

// ** Images
import LoginLight from '/public/images/login-light.png'
import LoginDark from '/public/images/login-dark.png'
import { useTranslation } from 'react-i18next'
import { useAuth } from 'src/hooks/useAuth'

// ** Components
import Icon from 'src/components/Icon'
import WrapperFileUpload from 'src/components/wrapper-file-upload'

type TProps = {}

type TDefaultValue = {
  email: string
  role: string
  fullName: string
  address: string
  city: string
  phoneNumber: string
}

const MyProfilePage: NextPage<TProps> = () => {
  // ** State
  const { user } = useAuth()

  const { t } = useTranslation()

  // ** Theme
  const theme = useTheme()

  const schema = yup.object().shape({
    email: yup.string().required('The field is required').matches(EMAIL_REG, 'The field is must email type'),
    role: yup.string().required('The field is required'),
    fullName: yup.string().required('The field is required'),
    address: yup.string().required('The field is required'),
    city: yup.string().required('The field is required'),
    phoneNumber: yup.string().required('The field is required')
  })

  const defaultValues: TDefaultValue = {
    email: '',
    role: '',
    fullName: '',
    address: '',
    city: '',
    phoneNumber: ''
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
    mode: 'onBlur'
  })

  const onSubmit = (data: TDefaultValue) => {
    console.log('data', data)
  }

  const handleUploadAvatar = (file: File) => {}

  useEffect(() => {
    if (user) {
      reset({
        email: '',
        address: '',
        city: '',
        phoneNumber: '',
        fullName: '',
        role: user?.role.name
      })
    }
  }, [user])

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete='off'>
      <Grid container>
        <Grid
          container
          item
          md={6}
          xs={12}
          sx={{ backgroundColor: theme.palette.background.paper, borderRadius: '15px', p: 4 }}
        >
          <Box sx={{ width: '100%', height: '100%' }}>
            <Grid container spacing={4}>
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
                    <Icon icon='ph:user-thin' fontSize={70} />
                  </Avatar>
                  <WrapperFileUpload
                    uploadFunc={handleUploadAvatar}
                    objectAcceptFile={{
                      'image/jpeg': ['.jpg', '.jpeg'],
                      'image/png': ['.png']
                    }}
                  >
                    <Button variant='outlined' sx={{ width: 'auto', dislay: 'flex', alignItems: 'center', gap: 1 }}>
                      <Icon icon='ph:camera-thin' />
                      {t('Upload_avatar')}
                    </Button>
                  </WrapperFileUpload>
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
                      label={t('Email')}
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      placeholder={t('Enter_your_email')}
                      error={Boolean(errors.email)}
                      helperText={errors.email?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <Controller
                  control={control}
                  name='role'
                  rules={{ required: true }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomTextField
                      required
                      fullWidth
                      label={t('Role')}
                      value={value}
                      disabled
                      onChange={onChange}
                      onBlur={onBlur}
                      placeholder={t('Enter_your_role')}
                      error={Boolean(errors.role)}
                      helperText={errors.role?.message}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid container item md={6} xs={12}>
          <Box sx={{ ml: 5, backgroundColor: theme.palette.background.paper, borderRadius: '15px', p: 4 }}>
            <Grid container spacing={4}>
              <Grid item md={6} xs={12}>
                <Controller
                  control={control}
                  name='fullName'
                  rules={{ required: true }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomTextField
                      required
                      fullWidth
                      label={t('Full_name')}
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      placeholder={t('Enter_your_full_name')}
                      error={Boolean(errors.fullName)}
                      helperText={errors.fullName?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <Controller
                  control={control}
                  name='address'
                  rules={{ required: true }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomTextField
                      required
                      fullWidth
                      label={t('Address')}
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      placeholder={t('Enter_your_address')}
                      error={Boolean(errors.address)}
                      helperText={errors.address?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <Controller
                  control={control}
                  name='city'
                  rules={{ required: true }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomTextField
                      required
                      fullWidth
                      label={t('City')}
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      placeholder={t('Enter_your_city')}
                      error={Boolean(errors.city)}
                      helperText={errors.city?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <Controller
                  control={control}
                  name='phoneNumber'
                  rules={{ required: true }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomTextField
                      required
                      fullWidth
                      label={t('Phone_number')}
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      placeholder={t('Enter_your_phone')}
                      error={Boolean(errors.phoneNumber)}
                      helperText={errors.phoneNumber?.message}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>

      {/* sx={{ backgroundColor: theme.palette.background.paper, borderRadius: '15px', p: 4 }} */}

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
