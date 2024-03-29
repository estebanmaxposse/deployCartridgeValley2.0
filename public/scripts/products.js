const renderProducts = async () => {
    const token = localStorage.getItem('token')
    await fetch('/api/products', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        }
    })
        .then(res => {
            if (!res.ok) {
                if (res.status === 401) {
                    console.log('Unauthorized');
                    window.location.href = '../pages/login.html'
                }
                throw new Error('Error fetching products')
            }
            return res.json()
        })
        .then(data => renderProductsTable(data))
        .catch(error => console.log(error))
}

renderProducts()

const renderByCategory = async (category) => {
    const token = localStorage.getItem('token')
    await fetch(`/api/products/${category}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        }
    })
        .then(res => {
            if (!res.ok) {
                if (res.status === 401) {
                    console.log('Unauthorized');
                    window.location.href = '../pages/login.html'
                }
                throw new Error('Error fetching products')
            }
            return res.json()
        })
        .then(data => renderProductsTable(data))
        .catch(error => console.error(error))
}

const renderProductsTable = (data) => {
    document.getElementById('product-container').innerHTML = ''
    let table = '<table class="table table-stripped w-75 m-auto table-hover table-bordered">'
    table += '<thead><tr><th scope="col">ID #</th><th scope="col">Title</th><th scope="col">price</th><th scope="col">Thumbnail</th></tr></thead>'
    table += '<tbody>'
    data.forEach(product => {
        table += `
        <tr class='text-center'>
            <th scope='row'> ${product._id} </th>
            <td class='text-center'>${product.title}</td>
            <td class='text-center'>${product.price}</td>
            <td class='text-center'><img src=${product.thumbnail} class='w-25 h-auto' />
        </tr>`
    });
    table += '</tbody></table>'
    document.getElementById('product-container').innerHTML = table
}

const categoryButtons = document.querySelectorAll('.category-buttons button');
categoryButtons.forEach((button) => {
    button.addEventListener('click', () => {
        // Get the category from the button's ID
        const category = button.id;

        // Fetch the products by category and render the table
        renderByCategory(category);
    });
});