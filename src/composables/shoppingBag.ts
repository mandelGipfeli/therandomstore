import { useCheckoutStore } from '../stores/checkoutStore.ts';
import { ProductItem } from '../interfaces.ts';
import { updateCheckoutStoreStorage } from '../stores/persistStoreState.ts'


export function useShoppingBag(){
    const store = useCheckoutStore()

    /** Increase the counts of matched products, add new products to bag */
    let addToBag = (product: ProductItem) => {
        store.$patch((state) => {
            let addedToBag = false

            console.log(state, 'bag')
            /** Update product count */
            state.bag.forEach((p,index) => {
                if(p.id === product.id){
                    addedToBag = true
                    state.bag[index].count = state.bag[index].count + 1
                }
            })

            /** Add new products */
            if(state.bag.length < 1 || !addedToBag){
                product.count = 1
                state.bag.push(product)
                return 
            }
        })

        updateCheckoutStoreStorage()
    }

    /** Remove matched products with counts of 1 from the bag, reduce others */
    let subtractFromBag = (product: ProductItem) => {
        store.$patch((state) => {
            state.bag.forEach((p,index) => {
                /** Update product count */
                if(p.id === product.id && p.count > 1){
                    state.bag[index].count = state.bag[index].count - 1
                }
                /** Remove last product */
                else if(p.id === product.id && p.count < 2) {
                    state.bag.splice(index, 1)
                }
            })
        })

        updateCheckoutStoreStorage()
    }

    let removeFromBag = (product: ProductItem) => {
        let match: number = -1

        store.$patch((state) => {
            state.bag.forEach((p, index) => {
                if(p.id === product.id){
                    match = index 
                    return 
                }
            })

            if(match > -1){
                state.bag.splice(match, 1)
            }
        })

        updateCheckoutStoreStorage()
    }

    return { addToBag, subtractFromBag, removeFromBag }
}