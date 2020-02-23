const list_model = require('../models/list-model');
const list_views = require('../views/list-views');
const item_views = require('../views/item-views');
const item_model = require('../models/item-model');

const get_lists = (req, res, next) => {
    const user = req.user;
    user.populate('lists')
        .execPopulate()
        .then(() => {
            console.log('user:', user);
            let data = {
                user_name: user.name,
                lists: user.lists
            };
            let html = list_views.list_view(data);
            res.send(html);
        });
};
//Tarkistus
/*const post_lists = (req, res, next) => {
    const user_name = req.body.user_name;
    user_model.findOne({
        name: user_name
    }).then((user) => {
        if (user) {
            req.session.user = user;
            return res.redirect('/');
        }
        res.redirect('/login');
    });
};*/



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

const get_list = (req, res, next) => {
    const _id = req.params.id;
    list_model.findOne({
        _id: _id
    }).then((list) => {
 /*       res.send(list.text);
    });
};*/
////
        let html = item_views.item_view(data);
            res.send(html);
    });
};
/////
const post_list = (req, res, next) => {
    const user = req.user;
    let new_list = list_model({
        text: req.body.list
    });
    new_list.save().then(() => {
        console.log('list saved');
        user.lists.push(new_list);
        user.save().then(() => {
            return res.redirect('/');
        });
    });
};


module.exports.get_lists = get_lists;
module.exports.get_list = get_list;
module.exports.post_list = post_list;
module.exports.post_delete_list = post_delete_list;
// Vaatii tarkistuksen
//module.exports.post_lists = post_lists;

