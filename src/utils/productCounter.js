const productCounter = (products, cart) => {
    let uniqueProducts = cart.products.reduce((acc, item) => {
        acc[item._id] = {
          count: item.count,
          totalPrice: item.totalPrice
        };
        return acc;
      }, {});

    for (const product of products) {
        if (uniqueProducts.hasOwnProperty(product._id)) {
            uniqueProducts[product._id].count++;
            uniqueProducts[product._id].totalPrice += product.price;
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