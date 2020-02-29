const list_model = require('../models/list-model');
const item_model = require('../models/item-model');
const item_views = require('../views/item-views');
const list_views = require('../views/list-views');

const get_lists = (req, res, next) => {
    const user = req.user;

    user.populate('lists').execPopulate().then(() => {
        let data = {
            user_name: user.name,
            lists: user.lists
        };
        let html = list_views.list_view(data);
        res.send(html);
    });
};

const get_list = (req, res, next) => {
    const list_id = req.params.id;
    const user = req.user;
    list_model.findOne({
        _id: list_id
    }).then((list) => {
        list.populate('items').execPopulate().then(() => {
            let data = {
                user_name: user.name,
                list_name: list.text,
                items: list.items,
                list_id: list._id
            };
            let html = item_views.item_view(data);
            res.send(html);
        });
    });
};

const post_item = (req, res, next) => {
    const list_id = req.params.id;
    list_model.findOne({
        _id: list_id
    }).then((list) => {
        
        let new_item = item_model({
            text: req.body.item_text,
            quantity: req.body.quantity,
            price: req.body.price
        });

        new_item.save().then(() => {
            list.items.push(new_item);
            list.save().then(() => {
                return res.redirect(`/list/${list._id}`);
            });
        });
    });
};


const post_list = (req, res, next) => {
    const user = req.user;

    let new_list = list_model({
        text: req.body.list,
        items: []
    });

    new_list.save().then(() => {
        user.lists.push(new_list);
        user.save().then(() => {
            return res.redirect('/');
        });
    });
};

const post_delete_list = (req, res, next) => {
    const user = req.user;
    const list_id_to_delete = req.body.list_id;
    

    //Remove note from user.notes
    const updated_lists = user.lists.filter((list_id) => {
        return list_id != list_id_to_delete;
    });
   user.lists = updated_lists;

    //Remove note object from database
    user.save().then(() => {
        list_model.findByIdAndRemove(list_id_to_delete).then(() => {
            res.redirect('/');
        });
    });
};

const post_delete_item = (req, res, next) => {
    const list_id = req.params.id;
    const item_id_to_delete = req.body.item_id;
     // find shoppinglist
  list_model
  .findById(req.body.list_id)
  .then(list => {


    //Remove item from list.items
    const updated_items = list.items.filter((item_id) => {
        return item_id != item_id_to_delete;
    });
    list.items = updated_items;

    //Remove item object from database
    list.save().then(() => {
        item_model.findByIdAndRemove(item_id_to_delete).then(() => {
            res.redirect(`/list/${list._id}`);
        });
    });
    });
};

module.exports.get_lists = get_lists;
module.exports.get_list = get_list;
module.exports.post_list = post_list;
module.exports.post_delete_list = post_delete_list;
module.exports.post_item = post_item;
module.exports.post_delete_item = post_delete_item;