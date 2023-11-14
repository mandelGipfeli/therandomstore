import { defineStore } from 'pinia';
import { CheckoutState } from '../interfaces.ts';


export const useCheckoutStore = defineStore('checkout', {
    state: (): CheckoutState => {
      return {
        bag: [],
        viewCheckout: false,
      }
    },
    getters: {

      /**
       * 
       * @param state 
       * @returns {number} total
       */
      getBagTotal: (state) => {
        let total = 0

        if(state.bag.length < 1){
          return total
        }

        state.bag.forEach((product) => {
          /** guard  */
          if(product.title){
            total += product.count * product.price
          }
        })

        return total
      },

      /**
       * 
       * @param state 
       * @returns {number} count
       */
      getBagCount: (state) => {
        let count = 0

        if(state.bag.length < 1){
          return count
        }

        state.bag.forEach((product) => {
          count += product.count 
        })

        return count
      }
    },
})