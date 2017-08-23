import { RECORD_FOODS, RECORD_SELLER, SHOW_NAME } from './mutation-types.js'

export default {
  [RECORD_FOODS] (state, foods) {
    state.foods = foods
  },
  [RECORD_SELLER] (state, seller) {
    state.seller = seller
  },
  [SHOW_NAME] (state) {
    console.log(state.foods)
  }
}
