const list_view = ((data) => {
    let html = `
    <html>
    <head><title>Ostoslista</title>
        
        <link rel="stylesheet" type="text/css" href="css/style.css">
        </head>
    <body>
    <div class="topnav">
        <h1>Logged in as user: ${data.user_name}
        <form action="/logout" method="POST">
            <button type="submit">Log out</button>
        </form></div></h1><div class = "tausta">`;
    

    data.lists.forEach((list) => {
        html += `
            <a href="/list/${list._id}">${list.text}</a>
            <form action="delete-list" method="POST">
                <input type="hidden" name="list_id" value="${list._id}">
                <button type="submit">Delete list</button>
            </form>
            `;
    });

    html += `
        <form action="/add-list" method="POST">
            <input type="text" name="list">
            <button type="submit">Add list</button>
        </form>
        </div>
    </html>
    </body>
    `;
    return html;
});

module.exports.list_view = list_view;

