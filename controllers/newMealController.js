const newMealModel = require('../models/newMealModel');


async function addNewMeal(req, res){

    const { imageUrl, mealDate, mealType, glucoseLevel } = req.body;
    const userId = req.session.userId;//Get current user id from id session

     // Analyze the image to get the food tag using imagga
     const foodTag = await analyzeImage(imageUrl);

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

async function analyzeImage(imageUrl){
    try {
        // Call the model to analyze the image
        return await newMealModel.analyzeImage(imageUrl);

    } catch (error) {
        console.error('Error analyzing image:', error);
        res.status(500).send('Error analyzing the image');
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
      res.status(500).send("Error fetching day type");
    }
};

module.exports = {
    addNewMeal,analyzeImage,getUSDAglucose,getDateType
  };
  
