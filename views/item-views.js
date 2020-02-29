const item_view = ((data) => {
    let html = `
    <html>
    <style>
    body {
        background-color: rgb(175, 175, 120);
    }

    button {
        background-color: greenyellow;
        cursor: pointer;
        text-align: center;
        color: darkblue;
        border: solid darkblue;
        font-size: 16px;
        margin: 5px;
    
    }
    
    h4 {
        position: absolute;
        top: 2em;
        left: 1em;
        width: 9em;
        color: red;
        
      }
      h1 {
        font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
        color: red;
        font-size: 110px;
        }
    
        .user {
         float:right;  
        }
    
        #user {
        position: absolute;
        right: 20px;
        top: 20px;
        z-index: +1;
        size: 15px;
        text-align: center;
         }
    
         #title {
          align-items: left;
          display: inline-block; 
         }
    
         table {           
           float:right;
           width: 1200px;
           border: 5px solid gold;
            background-color: #f3f3f3;
         }

         tr {           
            text-align: right;
          }

          
        .add {           
            float:left;
            margin-right:20px;
            border: 5px solid gold;
            background-color: #f3f3f3;
          }

         

         
      
    </style>
    <head><title>Ostoslista</title>
    <link rel="stylesheet" type="text/css" href="css/style.css">
    </head>
    <body>
    <div class="top"><div><a href="/"}><img src="https://www.inventicons.com/uploads/iconset/236/wm/512/Go-back-arrow-15.png" alt="back" style="width:20px;height:20px;"><h3>Back to shoppinglists<h3></a><br></div>
        <div id="title">
            <h1>SHOPPINGLIST: ${data.list_name}</h1>
        </div>
         <div id="user">
            Logged in as user: <br>${data.user_name}
            <form action="/logout" method="POST">
            <button type="submit">Log out</button>
            </form>
        </div>
    </div>
    
        
        </form> <div><br>
        
        
        
        <div class="add">
        <h3>ADD NEW ITEM</h3>
        <form action="/add-item/${data.list_id}" method="POST">
        
        
            <div><label for="Item_text">Item</label> <br>  
            <input type="text" name="item_text">
            <br></div>
                
            <div>
            <label for="quantity">Quantity</label><br>
            <input type="number" name="quantity">
            <br></div>

            <div>
            <label for="price">Price</label> <br>
            <input type="number" placeholder="1.0" step="0.1" name="price">€<br>
            <br></div>
            <div>
            <br><button type="submit">Add item</button></div>
        </form></div>

        <table width="400">
        <caption><h3>SHOPPINGLIST ITEMS</h3></caption>
        <th>Item\t</th><th>Quantity</th><th>Price</th><th></th>
        `;

   let sum=0;
   data.items.forEach((item) => {
        html += `<tr>
            <td>${item.text}</td> 
            <td>${item.quantity}</td> 
            <td>${item.price*item.quantity}</td>
            <td>
            <form action="/delete-item/" method="POST">
                <input type="hidden" name="item_id" value="${item._id}">
                <input type="hidden" name="list_id" value="${data.list_id}">
                <button type="submit">Delete item</button>
            </form></td>
            </tr>
            `;
            sum= sum + item.price*item.quantity;
    });
        
    html +=
         `
        <td><td></td><td><b>List cost: ${sum}€<b></td>
        </tr>
        </table>
        
        </div>
    
    </body>
    </html>
    `;
    return html;
});

module.exports.item_view = item_view;