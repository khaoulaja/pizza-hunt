const {Pizza} = require('../models');

const pizzaController = {
    //get all pizzas
    getAllPizza(req, res) {
        Pizza.find({})
        .populate({
            path: 'comments',
            select: '-__v'
          })
          .select('-__v')
          .sort({ _id: -1 })
        .then(dbPizzaData => res.json(dbPizzaData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    //get on pizza by id
    getPizzaById({params}, res){
        Pizza.findOne({_id : params.id})
        .populate({
            path: 'comments',
            select: '-__v'
          })
        .select('-__v')
        .then(dbPizzaData => {
            //if no pizza is found send 404
            if(!dbPizzaData){
                res.status(404).json({ message: 'No pizza found with this id!' });
                return;
              }
              res.json(dbPizzaData);
            })
            .catch(err => {
              console.log(err);
              res.status(400).json(err);
            });
    },
    //create Pizza
    createPizza({body}, res){
        Pizza.create(body)
        .then(dbPizzaData => res.json(dbPizzaData))
        .catch(err => res.status(400).json(err));
    },
    //Update pizza by id
    updatePizza({params, body}, res){
        // by setting that third parameter, { new: true }, it will return the new version of the document.
        Pizza.findOneAndUpdate({_id: params.id}, body, {new: true})
        .then(dbPizzaData => {
            if(!dbPizzaData){
                res.status(404).json({message: 'No pizza found with this id!'});
                return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => res.status(404).json(err));
    },
    //delete pizza
    deletePizza({params}, res){
        //we could alternatively use .deleteOne() or .deleteMany(), but we're using the .findOneAndDelete() method because it provides a little more data in case the client wants it.
        Pizza.findOneAndDelete({_id : params.id})
        .then(dbPizzaData => {
            if (!dbPizzaData) {
                res.status(404).json({message : 'No pizza found with this id!'});
                return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => res.status(400).json(err));
    }

};

module.exports = pizzaController;