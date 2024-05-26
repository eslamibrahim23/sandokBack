const router = require("express").Router();

const{add,getall,getone,deleteClient,updateClient}=require('../controllers/clientController')

router.route('/add').post(add);
router.route('/allClient').get(getall);
router.route('/:id').get(getone);
router.route('/:id').delete(deleteClient);
router.route('/:id').patch(updateClient);


module.exports=router;