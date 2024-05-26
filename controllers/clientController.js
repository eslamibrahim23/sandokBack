const Cleint = require("../models/cleintSchema");


const add = async (req, res, next) => {
  try {
    const { clientName,nationalID,phone,administrator,projValue,paidPerMonth,firstDateYear,firstDateMonth } = req.body;

    // const firstDate="2023-01";
    const dateNow= new Date();

    // const firstDateYear=firstDate.split("-")[0];
    // const firstDateMonth=firstDate.split("-")[1];

    const yearNow=dateNow.getFullYear();
    const monthNow=(dateNow.getMonth()+1);

    const noOfMonths=((yearNow-firstDateYear)*12+(monthNow-firstDateMonth))+1

    const paid= paidPerMonth*noOfMonths;
    const remain= projValue-paid;
    
    const remainInMonth=remain/paidPerMonth;
    await Cleint.create({
      clientName,nationalID,phone,administrator,projValue,paidPerMonth,remain,remainInMonth
    });
    return res.status(201).json({ status: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "client add has an error",error });
  }
};

const getall = async (req, res, next) => {
  try {
   const allClient= await Cleint.find();
    return res.status(201).json({allClient});
  } catch (error) {
    res.status(500).json({ message: "client getall has an error",error });
  }
};
const getone = async (req, res, next) => {
  try {
    console.log(req.params);
    const id=req.params.id
    console.log(id);
   const client= await Cleint.findById(id);
    return res.status(201).json({client});
  } catch (error) {
    res.status(500).json({ message: "client getone has an error",error });
  }
};

const deleteClient = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deleteUser = await Cleint.findByIdAndDelete(id);
    return res.json({ deleteUser, message: "cleint Deleted successfully!" });
  } catch (error) {
    res.json({
      statud: "cleint Not found go to Create cleint",
    });
    next();
  }
};

const updateClient = async (req, res, next) => {
  try {
    const id = req.params.id;
    
    const updated = await Cleint.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.send({ updated, message: "post Updated successfully!" });
  } catch (error) {
    res.json({
      statud: "Story Not found go to Create page",
    });
    next();
  }
};

module.exports = { add,getall,getone,deleteClient,updateClient};