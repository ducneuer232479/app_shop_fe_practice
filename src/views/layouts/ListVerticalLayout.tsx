'use client'

import React, { useEffect, useState } from 'react'

// ** Next
import { NextPage } from 'next'

// ** Mui
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Collapse from '@mui/material/Collapse'

// ** Data
import { VerticalItems } from 'src/configs/layout'

// ** Components
import IconifyIcon from 'src/components/Icon'

type TProps = {
  open: boolean
}

type TListItem = {
  items: any
  level: number
  openItems: {
    [key: string]: boolean
  }
  setOpenItems: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>
  disabled: boolean
}

const RecursiveListItem: NextPage<TListItem> = ({ items, level, openItems, setOpenItems, disabled }) => {
  const handleClick = (title: string) => {
    if (!disabled) {
      setOpenItems(prev => ({
        ...prev,
        [title]: !prev[title]
      }))
    }
  }

  return items.map((item: any) => (
    <React.Fragment key={item.title}>
      <ListItemButton
        sx={{
          padding: `8px 10px 8px ${level * (level === 1 ? 28 : 20)}px`
        }}
        onClick={() => {
          if (item.childrens) {
            handleClick(item.title)
          }
        }}
      >
        <ListItemIcon>
          <IconifyIcon icon={item.icon} />
        </ListItemIcon>
        {!disabled && <ListItemText primary={item.title} />}
        {item.childrens &&
          item.childrens.length > 0 &&
          (openItems[item.title] ? (
            <IconifyIcon
              icon='ic:twotone-expand-less'
              style={{
                transform: 'rotate(180deg)'
              }}
            />
          ) : (
            <IconifyIcon icon='ic:twotone-expand-less' />
          ))}
      </ListItemButton>
      {item.childrens && item.childrens.length > 0 && (
        <Collapse in={openItems[item.title]} timeout='auto' unmountOnExit>
          <RecursiveListItem
            items={item.childrens}
            level={level + 1}
            openItems={openItems}
            setOpenItems={setOpenItems}
            disabled={disabled}
          />
        </Collapse>
      )}
    </React.Fragment>
  ))
}

const ListVerticalLayout: NextPage<TProps> = ({ open }) => {
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({})

  const handleToggleAll = () => {
    setOpenItems({})
  }

  useEffect(() => {
    if (!open) {
      handleToggleAll()
    }
  }, [open])

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component='nav'
      aria-labelledby='nested-list-subheader'
    >
      <RecursiveListItem
        items={VerticalItems}
        level={1}
        openItems={openItems}
        setOpenItems={setOpenItems}
        disabled={!open}
      />
    </List>
  )
}

export default ListVerticalLayout
