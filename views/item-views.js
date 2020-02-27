const item_view = ((data) => {
    let html = `
    <html>
    <head><title>Ostoslista</title>
        
    <link rel="stylesheet" type="text/css" href="css/style.css">
    </head>
    <body>
    
        Logged in as user: 
        <form action="/logout" method="POST">
            <button type="submit">Log out</button>
            </div>
        </form> <div class = "tausta">`;

   
   data.items.forEach((item) => {
        html += item.text; 
        html += `
            <form action="/delete-item/" method="POST">
                <input type="hidden" name="item_id" value="${item._id}">
                <input type="hidden" name="list_id" value="${data.list_id}">
                <button type="submit">Delete item</button>
            </form>
            `;
    });

    html += `
        <form action="/add-item/${data.list_id}" method="POST">
            <input type="text" name="item_text">Item
            <input type="number" name="quantity">Quantuty
            <input type="number" placeholder="1.0" step="0.1" name="price">Price/
            <button type="submit">Add item</button>
        </form>
        </div>
    </html>
    </body>
    `;
    return html;
});

module.exports.item_view = item_view;