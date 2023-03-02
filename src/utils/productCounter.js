const productCounter = (products, cart) => {
    // console.log('CART: ', cart);
    let uniqueProducts = cart.products.reduce((acc, item) => {
        acc[item._id] = {
          count: item.count,
          totalPrice: item.totalPrice
        };
        return acc;
      }, {});

    console.log('OLD CART: ', uniqueProducts);
    for (const product of products) {
        console.log(product.price);
        if (uniqueProducts.hasOwnProperty(product._id)) {
            uniqueProducts[product._id].count++;
            uniqueProducts[product._id].totalPrice += product.price;
            console.log('TOTAL PRICE: ', uniqueProducts[product._id].totalPrice);
        } else {
            uniqueProducts[product._id] = {
                count: 1,
                totalPrice: product.price,
            };
        }
    }

    const totalProducts = [];

    for (const _id in uniqueProducts) {
        totalProducts.push({
            _id,
            count: uniqueProducts[_id].count,
            totalPrice: uniqueProducts[_id].totalPrice,
        });
    }

    return totalProducts;
}

const totalCounter = (products) => {
    let totalCount = 0
    let totalPrice = 0

    for (const product of products) {
        totalCount += product.count;
        totalPrice += product.totalPrice;
    }

    return { totalCount, totalPrice };
}

export { productCounter, totalCounter };