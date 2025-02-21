import * as React from 'react'

// ** Next
import { NextPage } from 'next'

// ** MUI
import { styled } from '@mui/material/styles'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'

// ** Components
import Icon from 'src/components/Icon'
import ModeToggle from './components/mode-toggle'
import LanguageDropdown from './components/language-dropdown'

// ** Layouts
import UserDropdown from 'src/views/layouts/components/user-dropdown'
import { useRouter } from 'next/router'
import { useAuth } from 'src/hooks/useAuth'
import { Button } from '@mui/material'
import { ROUTE_CONFIG } from 'src/configs/route'

const drawerWidth: number = 240

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

type TProps = {
  open: boolean
  toggleDrawer: () => void
  isHideMenu?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open'
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor:
    theme.palette.mode === 'light' ? theme.palette.customColors.lightPaperBg : theme.palette.customColors.darkPaperBg,
  color: theme.palette.primary.main,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}))

const HorizontalLayout: NextPage<TProps> = ({ open, toggleDrawer, isHideMenu }) => {
  const router = useRouter()
  const { user } = useAuth()

  return (
    <AppBar position='absolute' open={open}>
      <Toolbar
        sx={{
          pr: '30px', // keep right padding when drawer closed
          margin: '0 20px'
        }}
      >
        {!isHideMenu && (
          <IconButton
            edge='start'
            color='inherit'
            aria-label='open drawer'
            onClick={toggleDrawer}
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' })
            }}
          >
            <Icon icon='ic:round-menu' />
          </IconButton>
        )}

        <Typography component='h1' variant='h6' color='inherit' noWrap sx={{ flexGrow: 1 }}>
          Dashboard
        </Typography>
        <LanguageDropdown />
        <ModeToggle />
        {user ? (
          <UserDropdown />
        ) : (
          <Button
            variant='contained'
            sx={{ ml: 2, width: 'auto' }}
            onClick={() => router.push(`/${ROUTE_CONFIG.LOGIN}`)}
          >
            Sign In
          </Button>
        )}
        {/* <UserDropdown /> */}

        {/* <IconButton color='inherit'>
          <Badge badgeContent={4} color='primary'>
            <IconifyIcon icon='iconamoon:notification-light' />
          </Badge>
        </IconButton> */}
      </Toolbar>
    </AppBar>
  )
}

export default HorizontalLayout
