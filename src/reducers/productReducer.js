import { 
    ADD_PRODUCT,
    EDIT_PRODUCT,
    ACTIVE_PRODUCT,
    GET_PRODUCT,
    DELETE_PRODUCT } from "../actions/types";

const DEFAULT_STATE = {
   products: []
}

export const productReducer = (state = DEFAULT_STATE, action)=> {
    switch (action.type) {
        case GET_PRODUCT: {
            return {
                ...state,
                products: action.payload
            }
        }
        case ADD_PRODUCT: {
            // console.log("PAYLOAD: ", action.payload)
            const newProduct = [...state.products, action.payload];
            return {
                //the first way to execute
                // ...state,
                // products: [...state.products, action.payload]

                //The second way
                ...state,
                products: newProduct
            };
        }
        case EDIT_PRODUCT: {
            // console.log("PAYLOAD EDIT: ", action.payload);
            // const newProduct = [...state.products];
            // newProduct.map(product => {
            //     if(product._id === action.payload._id) {
            //         product = action.payload; 
            //         console.log("EDIT PRODUCT: ", product)
            //     }
            //     return product
            // })
            // return {
            //     ...state,
            //     products: [...newProduct]
            // };

            console.log("PAYLOAD EDIT: ", action.payload);
            return {
                ...state,
                products: [...state.products.map((product) => {
                  if (product._id === action.payload._id) {
                    product = action.payload;
                  }
                  return product;
                })]
            }
        }   
        case ACTIVE_PRODUCT: {
            console.log("PAYLOAD STATUS: ", action.payload);
            const newProduct = [...state.products];
            newProduct.map(product => {
                if(product._id === action.payload._id) {
                    product.checked = !product.checked; 
                    console.log("STATUS PRODUCT: ", product)
                }
                return product
            })
            return {
                ...state,
                products: newProduct
            };
            // return {
			// 	...state,
			// 	products: state.products.map(product => {
			// 		if (product._id === action.payload._id) product.checked = !product.checked;
			// 		return product
			// 	})
			// }
        }
        case DELETE_PRODUCT: {
            console.log("PAYLOAD DELETE: ", action.payload);
            return {
				...state,
				products: state.products.filter(product => product._id !== action.payload._id)
			}
        }
        default:
            return state;
    }
}