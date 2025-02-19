// ** React
import React from 'react'

// ** MUI
import { IconButton } from '@mui/material'

// ** Component
import Icon from 'src/components/Icon'

// ** Hook
import { useSettings } from 'src/hooks/useSettings'

// ** Type
import { Mode } from 'src/types/layouts'

type TProps = {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ModeToggle = (props: TProps) => {
  const { settings, saveSettings } = useSettings()

  const handleModeChange = (mode: Mode) => {
    saveSettings({ ...settings, mode })
  }

  const handleModeToggle = () => {
    if (settings.mode === 'dark') {
      handleModeChange('light')
    } else {
      handleModeChange('dark')
    }
  }

  return (
    <IconButton color='inherit' onClick={handleModeToggle}>
      <Icon icon={settings.mode === 'light' ? 'material-symbols:dark-mode-outline' : 'iconamoon:mode-light'} />
    </IconButton>
  )
}

export default ModeToggle
