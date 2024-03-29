import { combineReducers } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import appReducer from './slice/app'
import authReducer from './slice/auth'
import requestReducer from './slice/request'
import chatOneToOneReducer from './slice/chatOneToOne'
import chatGroupReducer from './slice/chatGroup'
import individualContactReducer from './slice/individualContact'
import loadingOverlayReducer from './slice/loadingOverlay'
import messageToastReducer from './slice/messageToast'

const rootPersistConfig = {
  key: 'root',
  storage: storage,
  keyPrefix: 'redux-',
  blacklist: [
    'lastRequest',
    'chatOneToOne',
    'chatGroup',
    'individualContact',
    'loadingOverlay',
    'messageToast'
  ]
}

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  lastRequest: requestReducer,
  chatOneToOne: chatOneToOneReducer,
  chatGroup: chatGroupReducer,
  individualContact: individualContactReducer,
  loadingOverlay: loadingOverlayReducer,
  messageToast: messageToastReducer
})

export { rootPersistConfig, rootReducer }
