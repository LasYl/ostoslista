const list_view = ((data) => {
    let html = `
    <html>
    <style>
    body {
    background-image: url("https://i.pinimg.com/236x/a4/32/4e/a4324e78291e41a5953fbd6b7f41d8f0.jpg");
    
    background-size: contain;
    }
    </style>
    <head><title>Ostoslista</title>
    <link rel="stylesheet" type="text/css" href="css/style.css">
    </head>
    <body>
    <div class="top">
        <div id="title">
            <h1>SHOPPINGLIST</h1>
        </div>
         <div id="user">
            Logged in as user: <br><b>${data.user_name}</b>
            <form action="/logout" method="POST">
            <button type="submit">Log out</button>
            </form>
        </div>
    </div>
    </body>
    <body>
    <hr>
    <div class="addlist">`;

    html += `
        Add new list
        <form action="/add-list" method="POST">
            <input type="text" name="list">
            <button type="submit">Add list</button>
        </form>
        </div><hr>
        <br><br><br><br><br><br><br><br>
        
        <div class="saved">
        <h2>SAVED LISTS:</h2>
        
    
    `;
    

    data.lists.forEach((list) => {
        html += `
        
            <a href="/list/${list._id}"><h3>${list.text}</h3></a>
            <form action="delete-list" method="POST">
                <input type="hidden" name="list_id" value="${list._id}">
                <button type="submit">Delete list</button>
            </form>
          
            `;
            
            
    html += `
    </div>
    </body>
    </html>
    `;
    });

    
    return html;
});

module.exports.list_view = list_view;

