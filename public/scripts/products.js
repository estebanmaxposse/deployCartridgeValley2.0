const renderProducts = () => {
    const token = localStorage.getItem('token')
    console.log('PRODUCTS', token);
    fetch('/api/products', {
        method: 'GET',
        headers: { authorization: 'Bearer ' + token }
    })
        .then(res => res.json())
        .then(data => {
            let table = '<table class="table table-stripped w-75 m-auto table-hover table-bordered">'
            table += '<thead><tr><th scope="col">ID #</th><th scope="col">Title</th><th scope="col">price</th><th scope="col">Thumnbnail</th></tr></thead>'
            table += '<tbody>'
            data.forEach(product => {
                table += `
                <tr class='text-center'>
                    <th scope='row'> ${product._id} </th>
                    <td class='text-center'><a href=${product.url}>${product.title}</a></td>
                    <td class='text-center'>${product.price}</td>
                    <td class='text-center'><img src=${product.thumbnail} class='w-25 h-auto' />
                </tr>`
            });
            table += '</tbody></table>'
            document.getElementById('product-container').innerHTML = table
        })
        .catch(error => console.error(error))
}

renderProducts()
