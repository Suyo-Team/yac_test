const defaultState = { authToken: "" }

function reducer(state = defaultState, { type, payload }){
    switch (type) {
        case '':
            return { ...state, ...payload };
        
        default:
            return state
            
    }

}

export default reducer;
