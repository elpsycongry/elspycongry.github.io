import React, { Children, useState } from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Box, IconButton, ListItemIcon } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home'
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

function Sidebar() {
  const listItems = [
    { id: 1, text: "Đào tạo", IconText: ImportContactsIcon },
    { id: 2, text: "Tuyển dụng", IconText: BusinessCenterIcon, children: ["Nhu cầu", "Kế hoạch tuyển dụng", "Phỏng vấn"] },
    { id: 3, text: "Thống kê", IconText: SignalCellularAltIcon }
  ]
  // const [isOpen, setIsOpen] = useState(false);
  // const handleMouseEnter = () => {
  //   setIsOpen(true);
  // };

  // const handleMouseLeave = () => {
  //   setIsOpen(false);
  // };
  //    onMouseEnter={handleMouseEnter}
  // onMouseLeave={handleMouseLeave}
    const [open, setOpen] = useState({});
  
    const handleClick = (id) => {
      setOpen(prev => ({ ...prev, [id]: !prev[id] }));
    };
  return (
    <Box>
      {/* <IconButton

        color='red'
        edge='start'
        sx={{ mr: 2 }}
      >
        <HomeIcon />
      </IconButton> */}
      <Drawer
        variant='permanent'
        anchor="left"
        sx={{ width: 240, flexShrink: 0, '& .MuiDrawer-paper': { width: 240, boxSizing: 'border-box', marginTop: '64px', backgroundColor: '#f3f3f3' } }}
      >
        <List>
          {listItems.map(({ id, text, IconText, children }) => (
             <div key={id}> {/* Sử dụng div thay cho React.Fragment */}
             <ListItem button onClick={() => children && handleClick(id)}>
               <ListItemIcon>
                 <IconText />
               </ListItemIcon>
               <ListItemText primary={text} />
               {children ? (open[id] ? <ExpandLess /> : <ExpandMore />) : null}
             </ListItem>
             {children && (
               <Collapse in={open[id] ?? false} timeout="auto" unmountOnExit>
                 <List component="div" disablePadding>
                   {children.map((subItem, index) => (
                     <ListItem button key={subItem - index} sx={{ pl: 4 }}>
                       <ListItemText primary={subItem} />
                     </ListItem>
                   ))}
                 </List>
               </Collapse>
             )}
           </div>
          ))}
        </List>
      </Drawer>
    </Box>

  );
}

export default Sidebar;