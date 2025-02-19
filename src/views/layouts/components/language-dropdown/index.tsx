/* eslint-disable @typescript-eslint/no-unused-vars */
// ** React
import React from 'react'

// ** Next
import { useTranslation } from 'react-i18next'

// ** Mui
import Box, { BoxProps } from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Popover from '@mui/material/Popover'
import Typography from '@mui/material/Typography'

// ** Components
import Icon from 'src/components/Icon'
import { styled } from '@mui/material'
import { LANGUAGE_OPTIONS } from 'src/configs/i18n'

type TProps = {}

interface TStyledItem extends BoxProps {
  selected: boolean
}

const StyledItemLanguage = styled(Box)<TStyledItem>(({ theme, selected }) => ({
  cursor: 'pointer',
  '.MuiTypography-root': {
    padding: '8px 12px'
  },
  '&:hover': {
    backgroundColor: 'red'
  }
}))

const LanguageDropdown = (props: TProps) => {
  // ** State
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  // ** Hooks
  const { i18n } = useTranslation()

  const open = Boolean(anchorEl)

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleOnchangeLang = (lang: string) => {
    i18n.changeLanguage(lang)
  }

  return (
    <>
      <IconButton color='inherit' onClick={handleOpen} id='language-dropdown'>
        <Icon icon='material-symbols-light:translate' />
      </IconButton>
      <Popover
        id='language-dropdown'
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
      >
        {LANGUAGE_OPTIONS.map(lang => (
          <StyledItemLanguage
            key={lang.value}
            selected={lang.lang === i18n.language}
            onClick={() => handleOnchangeLang(lang.value)}
          >
            <Typography>{lang.lang}</Typography>
          </StyledItemLanguage>
        ))}
      </Popover>
    </>
  )
}

export default LanguageDropdown
