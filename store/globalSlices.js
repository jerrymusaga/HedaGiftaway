import { createSlice } from '@reduxjs/toolkit'
import { global_actions as GlobalActions } from './actions/globalActions'
import { global_states as GlobalStates } from './states/globalStates'

export const globalSlice = createSlice({
    name: 'global',
    initialState: GlobalStates,
    reducers: GlobalActions
})

export const globalActions = globalSlice.actions
export default globalSlice.reducer;