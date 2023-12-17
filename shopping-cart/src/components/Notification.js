import React from 'react'
import {Alert} from '@mui/material'
import {useSelector,useDispatch} from 'react-redux'
import { uiActions } from '../store/ui-slice';

function Notification({type,message}) {
    const dispatch=useDispatch();
    const handleClose=()=>{
        dispatch(uiActions.showNotification(
            {
                open:false
            }
        ))
    }
    const notification=useSelector(state=>state.ui.notification);
  return (
    <div>
      { notification.open && <Alert onClose={handleClose} severity={type}>{message}</Alert>}
    </div>
  )
}

export default Notification
