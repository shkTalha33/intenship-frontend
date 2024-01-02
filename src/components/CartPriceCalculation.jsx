const CartPriceCalculation = ({cart,shippingFees}) => {
   let totalAmount = 0 ;
   const discountTotal = cart.map((price)=> {
      const discountPrice  =  ((price.productPrice * price.productDiscount) / 100 )
       totalAmount += (price.productPrice - discountPrice) * price.quantity
   })
  
   if (shippingFees) {
     return (totalAmount + 30)
   }
   return (totalAmount)

}

export default CartPriceCalculation