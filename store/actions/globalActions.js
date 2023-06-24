export const globalActions = {
    setWallet: (state,action) => {
        state.wallet = action.payload;
    },
    setGiveaways: (state,action)=>{
        state.giveaways = action.payload;
    },
    setGeneratorModal: (state,action)=>{
        state.generatorModal = action.payload;
    },
    setWinnersModal: (state,action)=>{
        state.winnersModal = action.payload;
    }
    
}