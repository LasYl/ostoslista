const item_model = require('../models/item-model');
const item_views = require('../views/item-views');
//uusi
const list_model = require("../models/list-model");

const get_items = (req, res, next) => {
    const list_id = req.params.id;
    list_model.findOne({
        _id: list_id
    }).then((list) => {
        let data = {
            list: list,
            user_name: req.user.name
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
/*const get_items = (req, res, next) => {
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
};*/


//tarkistua
//const post_items = (req, res, next) => {
    /*const list_name = req.body.list_name;
    user_model.findOne({
        name: list_name
    }).then((user) => {
        
            req.session.user = user;*/
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
        res.send(item.text);
    });
};

const post_item = (req, res, next) => {
    const list = req.list;
    let new_item = item_model({
        text: req.body.item
    });
    new_item.save().then(() => {
        console.log('item saved');
        list.items.push(new_item);
        list.save().then(() => {
            return res.redirect('/');
        });
    });
};


module.exports.get_items = get_items;
module.exports.get_item = get_item;
module.exports.post_item = post_item;
module.exports.post_delete_item = post_delete_item;
//tarkistus
//module.exports.post_items = post_items;