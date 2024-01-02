const  DiscountedPriceCalculation = ({price,discount,quantity}) => {
        const discountPrice  =  (price * discount) / 100 
        const discountAmount = (price - discountPrice)
        if (quantity) {
               const subTotal = (discountAmount * quantity)
               return subTotal 
       }else{
           return (discountAmount)
       }

}

export default DiscountedPriceCalculation




