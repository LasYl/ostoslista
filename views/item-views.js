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
        </form>`;


   data.list.items.forEach((item) => {
        html += item.text; 
        html += `
            <form action="delete-item" method="POST">
                <input type="hidden" name="item_id" value="${item._id}">
                <button type="submit">Delete item</button>
            </form>
            `;
    });

    html += `
        <form action="/add-item" method="POST">
            <input type="text" name="item">
            <button type="submit">Add item</button>
        </form>
    </html>
    </body>
    `;
    return html;
});

module.exports.item_view = item_view;