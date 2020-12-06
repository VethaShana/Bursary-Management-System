import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import PaymentIcon from '@material-ui/icons/Payment';
import PersonIcon from '@material-ui/icons/Person';
import SettingsIcon from '@material-ui/icons/Settings';
import UpdateOutlinedIcon from '@material-ui/icons/UpdateOutlined';

// mainListItems -> Dashbaord, Students, Pending Applications, Installments, 
// secondaryListItems -> Users, Settings, 

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <SupervisedUserCircleIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText primary="Students" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <UpdateOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary="Pending Applications" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PaymentIcon  fontSize="small"/>
      </ListItemIcon>
      <ListItemText primary="Installments" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <PersonIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText primary="Users" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <SettingsIcon  fontSize="small"/>
      </ListItemIcon>
      <ListItemText primary="Settings" />
    </ListItem>
  </div>
);