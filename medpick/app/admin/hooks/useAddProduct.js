const useAddProduct = async (details) => {
    
    let url = 'create'

    const response = await fetch(`/app/admin/product/create${url}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            title: details.title,
            description: details.description,
            url: details.url,
            price: details.price,
           
        })
    })

    const data = await response.json();

    return data
}