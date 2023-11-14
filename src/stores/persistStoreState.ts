import { useCheckoutStore } from './checkoutStore.ts'


/**
 * @set localStorage
 */
const setCheckoutStore = () => {
    const store = useCheckoutStore()
    let bag = localStorage.getItem("bag");

    if(bag){
        store.bag = JSON.parse(bag)
    }
} 

/**
 * @get localStorage
 */
const updateCheckoutStoreStorage = () => {
    const store = useCheckoutStore()
    localStorage.setItem("bag", JSON.stringify(store.bag));
}


export { setCheckoutStore, updateCheckoutStoreStorage }