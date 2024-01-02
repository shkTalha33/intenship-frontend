const  DiscountedPriceCalculation = ({price,discount,quantity}) => {
        const discountPrice  =  (price * discount) / 100 
        const discountAmount = (price - discountPrice)
        if (quantity) {
               const subTotal = Math.round(discountAmount * quantity)
               return subTotal 
       }else{
           return Math.ceil(discountAmount)
       }

}

export default DiscountedPriceCalculation




