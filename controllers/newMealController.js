const newMealModel = require('../models/newMealModel');
const USDAmodel = require('../models/USDAmodel');
const dateModel = require('../models/dateModel');
const multer = require('multer');
const path = require('path');


async function addNewMeal(req, res){

    const { mealDate, mealType, glucoseLevel } = req.body;
    const userId = req.session.userId;//Get current user id from id session


    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }
     // Analyze the image to get the food tag using imagga
     const foodTag = await newMealModel.analyzeImage(req.file.path);

     // Fetch the glucose level based on the food tag
     const avgGlucose= await USDAmodel.getUSDAglucose(foodTag);

      // Get date type from hebcal service
      const userDate =
        mealDate || new Date().toISOString().split("T")[0];

      let isSpecialDay 
      const { date, dayType } = await dateModel.getDateType(userDate);
      if(dayType=="Holiday"){
        isSpecialDay= "yes"
      }
      else {
        isSpecialDay="no"
      }

    // Call the model to save meal data
    if (foodTag !== 'Unknown food')
         await newMealModel.addMeal(userId, foodTag, mealDate, mealType, isSpecialDay, glucoseLevel, avgGlucose);


     res.render('pages/home', { foodTag});
   
};

// Configure multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/uploads/'); // Ensure this directory exists
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Ensure file extension is added
    }
  });

const upload = multer({ storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // 5 MB file size limit
 });



module.exports = {
    addNewMeal, upload
  };
  
