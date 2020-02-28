const login_view = () => {
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
    <h1>SHOPPINGLIST</h1> <div class="front">
        <form action="/login" method="POST">
            <input type="text" name="user_name">
            <button type="submit">Log in</button>
        </form>
        <form action="/register" method="POST">
            <input type="text" name="user_name">
            <button type="submit">Register</button>
        </form>
        <div>
    </body>
    <html>
    `;

    return html;
}

module.exports.login_view = login_view;