const  DiscountedPriceCalculation = ({price,discount,quantity}) => {
        const discountPrice  =  ((price * discount) / 100 )
        const discountAmount = (price - discountPrice)
        if (quantity) {
               const subTotal = (discountAmount * quantity)
               return (subTotal ).toFixed(2)
       }else{
           return (discountAmount).toFixed(2)
       }

}

export default DiscountedPriceCalculation




