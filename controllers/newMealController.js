const newMealModel = require('../models/newMealModel');
const multer = require('multer');
const path = require('path');


async function addNewMeal(req, res){

    const { imageUrl, mealDate, mealType, glucoseLevel } = req.body;
    const userId = req.session.userId;//Get current user id from id session


    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }
     // Analyze the image to get the food tag using imagga
     const foodTag = await analyzeImage(req.file.path);

     // Fetch the glucose level based on the food tag
     const avgGlucose = await getUSDAglucose(foodTag);
     console.log(avgGlucose)

      // Get date type from hebcal service
      const userDate =
        mealDate || new Date().toISOString().split("T")[0];
        const isSpecialDay = await getDateType(userDate)
        console.log(isSpecialDay)

    // Call the model to save meal data
    await newMealModel.addMeal(userId, foodTag, mealDate, mealType, isSpecialDay, glucoseLevel, avgGlucose);


     res.render('pages/home', { foodTag});
   
};

// Configure multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Ensure this directory exists
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Ensure file extension is added
    }
  });

const upload = multer({ storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // 5 MB file size limit
 });

async function analyzeImage(imageFilePath) {
    console.log("hi")
    try {
        console.log(imageFilePath)
        const foodTag = await newMealModel.analyzeImage(imageFilePath);
       return foodTag
    
    } catch (error) {
        console.error('Error analyzing image:', error);
        throw error
    }
};



async function getUSDAglucose(foodTag){ 
    try {
       return await newMealModel.getUSDAglucose(foodTag);

    } catch (error) {
        console.error('Error fetching glucose level:', error);
        throw error;
    }
};

async function getDateType(userDate){
    try {
     
      // Call the date model with the user's date
      const { date, dayType } = await newMealModel.getDateType(userDate);
      if(dayType=="Holiday"){
        return "yes"
      }
      else{
        return "no"
      }
    } catch (error) {
      console.error("Error fetching day type:", error);
     throw error
    }
};

module.exports = {
    addNewMeal,analyzeImage,getUSDAglucose,getDateType, upload
  };
  
