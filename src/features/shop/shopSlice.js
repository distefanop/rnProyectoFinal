import { createSlice } from "@reduxjs/toolkit"
import categories from '../../mock/categories.json'
import products from '../../mock/products.json'


const shopSlice = createSlice({
    name: "shop",
    initialState: {
        categories,
        products,
        categorySelected: "",
        productsFilteredCat: [],
        productSelected: {}
    },
    reducers: {
        setCategorySelected: (state, action) => { state.categorySelected = action.payload },
        filterProducts: (state) => { state.productsFilteredCat = products.filter(product => product.category === state.categorySelected) },
        setProductSelect: (state, action) => { state.productSelected = action.payload }
    }
})

export const { setCategorySelected, filterProducts, setProductSelect } = shopSlice.actions
export default shopSlice.reducer