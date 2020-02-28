const item_view = ((data) => {
    let html = `
    <html>
    <head><title>Ostoslista</title>
    <link rel="stylesheet" type="text/css" href="css/style.css">
    </head>
    <body>
    
        Logged in as user: ${data.user_name}
        <form action="/logout" method="POST">
            <button type="submit">Log out</button>
            </div>
        </form> <div class = "tausta"><br>
        <div><a href="/}">Back to shoppinglists</a><br></div>
        <div><br>Shoppinglist: ${data.list_name} <br></div>

        <table>
        <th>Item</th><th>Quantity</th><th>Price</th><th></th>
        `;

   
   data.items.forEach((item) => {
        html += `<tr>
            <td>${item.text}</td> 
            <td>${item.quantity}</td> 
            <td>${item.price}</td>
            <td>
            <form action="/delete-item/" method="POST">
                <input type="hidden" name="item_id" value="${item._id}">
                <input type="hidden" name="list_id" value="${data.list_id}">
                <button type="submit">Delete item</button>
            </form></td>
            </tr>
            `;
    });

    html += `
        </table>
        <form action="/add-item/${data.list_name}" method="POST">
        
        <div style="float:left;margin-right:20px; border-style:double;">
        <label for="Item_text">Item</label> <br>  
        <input type="text" name="item_text">
        <br>
            
        
        <label for="quantity">Quantity</label><br>
        <input type="number" name="quantity">
        <br>

        
        <label for="price">Price</label> <br>
        <input type="number" placeholder="1.0" step="0.1" name="price">€<br>
        <br>

        <br><button type="submit">Add item</button>
        </form>
        </div>
    </html>
    </body>
    `;
    return html;
});

module.exports.item_view = item_view;