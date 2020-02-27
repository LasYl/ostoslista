/*const item_model = require('../models/item-model');
const item_views = require('../views/item-views');
//uusi
const list_model = require("../models/list-model");

const get_items = (req, res, next) => {
    const list_id = req.params.id;
    list_model.findOne({
        _id: list_id
    }).then((list) => {
        let data = {
            list_text: list.name,
            user_name: req.user.name,
            list_id:list._id
        };
        list.populate('items')
        .execPopulate()
        .then(() => {
            let html = item_views.item_view(data);
            res.send(html);
    })
}).catch(err => {
    console.log(err);
  });
}
// muokkaamaton
const get_items = (req, res, next) => {
    const list = req.list;
    list.populate('items')
        .execPopulate()
        .then(() => {
            console.log('list:', list);
            let data = {
                list_name: list.name,
                items: [list.items]
            };
            let html = item_views.items_view(data);
            res.send(html);
        });
};


//tarkistua
//const post_items = (req, res, next) => {
    const list_name = req.body.list_name;
    user_model.findOne({
        name: list_name
    }).then((user) => {
        
            req.session.user = user;
            //return res.redirect('/list/:id');
        
    //});
//};

const post_delete_item = (req, res, next) => {
    const list = req.list;
    const item_id_to_delete = req.body.item_id;

    //Remove item from list.items
    const updated_items = list.items.filter((item_id) => {
        return item_id != item_id_to_delete;
    });
    list.items = updated_items;

    //Remove item object from database
    list.save().then(() => {
        item_model.findByIdAndRemove(item_id_to_delete).then(() => {
            res.redirect('/');
        });
    });
};

const get_item = (req, res, next) => {
    const item_id = req.params.id;
    item_model.findOne({
        _id: item_id
    }).then((item) => {
        let data _{
            list_name: list.text,
            items: list.items,
            list_id: list._id
        }

        res.send(item.text);
    });
};

const post_item = (req, res, next) => {
    const list_id = req.params.id;
    list_model.findOne({
        _id: list_id
    }).then((_id) =>{
    let new_item = item_model({
        text: req.body.item_text
    });
    new_item.save().then(() => {
        console.log('item saved');
        list.items.push(new_item);
        list.save().then(() => {
            // Url vaatii tarkistuksen
            return res.redirect('/list/' + req.body.list_id);
            //return res.redirect('//list/:id');
        });
        });
    });
};

const post_add_shoppinglist = (req, res, next) => {
    const user = req.user;

    let new_list = list_model({
        text: req.body.list,
        products: []
    });

    new_list.save().then(() => {
        user.ists.push(new_shoppinglist);
        user.save().then(() => {
            return res.redirect('/');
        });
    });
};

const post_delete_list = (req, res, next) => {
    const user = req.user;
    const list_id_to_delete = req.body.list_id;

    const updated_list = user.lists.filter((list_id) => {
        return list_id != list_id_to_delete;
    });
    user.lists = updated_list;

    user.save().then(() => {
        list_model.findById(list_id_to_delete).then(() => {
            res.redirect('/');
        });
    });
};




module.exports.get_items = get_items;
module.exports.get_item = get_item;
module.exports.post_item = post_item;
module.exports.post_delete_item = post_delete_item;
//tarkistus
//module.exports.post_items = post_items;*/