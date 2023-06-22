export const globalActions = {
    setWallet: (state,action)=>{
        state.wallet = action.paylaod;
    },
    setGiveaways: (state,action)=>{
        state.giveaways = action.paylaod;
    },
    
}