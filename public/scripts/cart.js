let currentUser
let filteredCart

const cartList = document.getElementById('cart-products')
const cartTotal = document.getElementById('cart-total')

const filterCart = async () => {
    try {
        await fetch(`/api/auth/user`, {
            headers: { authorization: 'Bearer ' + localStorage.getItem('token') }
        })
            .then(res => {
                if (!res.ok) {
                    if (res.status === 401) {
                        console.log('Unauthorized');
                    }
                    throw new Error('Error fetching user')
                }
                return res.json()
            })
            .then(user => {
                currentUser = user
                return currentUser
            });
        await fetch(`/api/cart`, {
            headers: { authorization: 'Bearer ' + localStorage.getItem('token') }
        })
            .then(res => {
                return res.json()
            })
            .then(carts => {
                filteredCart = carts.find(cart => cart.buyerID === currentUser._id)
                if (filteredCart.products.length === 0) {
                    cartList.innerHTML = `
                        <h4> You haven't added any products yet! </h4>
                        <h5> why don't you go back and get some gamer goodies!</h5>
                    `
                } else {
                    let cartProducts
                    fetch(`/api/cart/${filteredCart._id}/products`, {
                        headers: { authorization: 'Bearer ' + localStorage.getItem('token') }
                    })
                        .then(res => { return res.json() })
                        .then(cart => {
                            cartTotal.innerHTML = `
                                <h4 class="m-2 font-weight-bold"> Total Products: ${cart.cartLength} </h4>
                                <h4 class="m-2 font-weight-bold"> Total Price: $${cart.total}.00 </h4>
                            `
                            cartProducts = cart.products
                            return cartProducts
                        })
                        .then(products => {
                            cartList.innerHTML = products.map(p =>
                                `
                                <li class="list-group-item">
                                    <div
                                    class="media align-items-lg-center flex-column flex-lg-row p-3"
                                    >
                                    <div class="media-body order-2 order-lg-1">
                                        <h5 class="mt-0 font-weight-bold mb-2">
                                            ${p.product.title}
                                        </h5>
                                        <p class="font-italic text-muted mb-0 small">
                                            ${p.product.description}
                                        </p>
                                        <div
                                        class="d-flex align-items-center justify-content-between mt-1"
                                        >
                                        <h7 class="my-2">Cost per unit: $${p.product.price}.00</h7>
                                        </div>
                                        <div
                                        class="d-flex align-items-center justify-content-between mt-1"
                                        >
                                        <h6 class="font-weight-bold my-2">Subtotal: $${p.subtotal}.00</h6>
                                        </div>
                                        <div
                                        class="d-flex align-items-center justify-content-between mt-1"
                                        >
                                        <h6 class="font-weight-bold my-2">Quantity: ${p.quantity}</h6>
                                        </div>
                                    </div>
                                    <img
                                        src=${p.product.thumbnail}
                                        alt=${p.product.title}
                                        width="100"
                                        class="ml-lg-5 order-1 order-lg-2"
                                    />
                                    </div>
                                </li>
                                `
                            ).join('')
                        }
                        )
                    document.getElementById('purchase-button').className = "btn btn-success"
                }
                return filteredCart
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

const completePurchase = async () => {
    try {
        const response = await fetch(`/api/order/${filteredCart._id}`, {
            method: 'post',
            body: filteredCart._id,
            headers: { authorization: 'Bearer ' + localStorage.getItem('token') }
        })
        console.log('Completed!', response);
        document.getElementById('purchase-button').innerHTML = 'Purchased!'
    } catch (error) {
        console.log(error);
    }
}