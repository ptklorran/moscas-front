import UserService from '../service'

export const actions = {
  listBalanceInvestment({ commit, dispatch }) {
    dispatch("enableLoading")
    UserService.listBalanceInvestment()
      .then(res => {
        dispatch("disableLoading")
        commit('setBalanceInvestment', res.data)
      })
      .catch(e => {
        dispatch("disableLoading")
        dispatch("createGlobalMessage", {
          type: "error",
          message: e.response.data.mesage,
          timeout: 6000
        })
        
      })
  },
  listBalanceToken({ commit, dispatch }) {
    console.log("ok bateuy")
    dispatch("enableLoading")
    UserService.listBalanceToken()
      .then(res => {
        dispatch("disableLoading")
        commit('setBalanceToken', res.data)
      })
      .catch(e => {
        dispatch("disableLoading")
        dispatch("createGlobalMessage", {
          type: "error",
          message: e.response.data.mesage,
          timeout: 6000
        })
        
      })
  },
  listBalanceUnilevel({ commit, dispatch }) {
    dispatch("enableLoading")
    UserService.listBalanceUnilevel()
      .then(res => {
        dispatch("disableLoading")
        commit('setBalanceUnilevel', res.data)
      })
      .catch(e => {
        dispatch("disableLoading")
        dispatch("createGlobalMessage", {
          type: "error",
          message: e.response.data.mesage,
          timeout: 6000
        })
        
      })
  },
};

export default {};
