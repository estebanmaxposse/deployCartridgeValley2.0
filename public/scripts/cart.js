let currentUser

const cartList = document.getElementById('cart-products')

const filterCart = async () => {
    try {
        await fetch(`/api/auth/user`)
            .then(res => {
                return res.json();
            })
            .then(user => {
                currentUser = user
                console.log(currentUser);
                return currentUser
            });
        await fetch(`/api/cart`)
            .then(res => {
                return res.json()
            })
            .then(carts => {
                console.log(carts);
                console.log(currentUser);
                const filteredCart = carts.find(cart => cart.buyerID === currentUser._id)
                console.log(filteredCart);
                if (filteredCart.products.length === 0) {
                    cartList.innerHTML = `
                        <h4> You haven't added any products yet! </h4>
                        <h5> why don't you go back and get some gamer goodies!</h5>
                    `
                } else {
                    cartList.innerHTML = filteredCart.products.map(product => 
                        `
                        <li class="list-group-item">
                            <div
                            class="media align-items-lg-center flex-column flex-lg-row p-3"
                            >
                            <div class="media-body order-2 order-lg-1">
                                <h5 class="mt-0 font-weight-bold mb-2">
                                    ${product.title}
                                </h5>
                                <p class="font-italic text-muted mb-0 small">
                                    ${product.description}
                                </p>
                                <div
                                class="d-flex align-items-center justify-content-between mt-1"
                                >
                                <h6 class="font-weight-bold my-2">$${product.price}.00</h6>
                                </div>
                            </div>
                            <img
                                src=${product.thumbnail}
                                alt=${product.title}
                                width="100"
                                class="ml-lg-5 order-1 order-lg-2"
                            />
                            </div>
                        </li>
                        `
                    ).join('')
                    document.getElementById('purchase-button').className = "btn btn-success"
                }
            })
            .catch(
                cartList.innerHTML = `
                        <h4 class="m-2 font-weight-bold"> You haven't added any products yet! </h4>
                        <h5 class="m-2"> why don't you go back and get some gamer goodies!</h5>
                    `
            )
    } catch (error) {
        console.log(error);
    }
}

filterCart()