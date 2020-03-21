const modelApi = require('./Home');
const getHomeModel = modelApi.GetModel;

const getHomeData = async () => {
    try {
        const Home = await getHomeModel();
        const homeList = await Home.find({});
        if (homeList.length === 1) {
            return homeList[0];
        }
        else { return null; }
    }
    catch (err) {
        console.log(err)
        throw err;
    }
}

const postHomeData = async homeData => {

    try {
        const Home = await getHomeModel();
        
        const existingHome = await getHomeData();
        if (!existingHome) {
            return await new Home({...homeData}).save();
        }
        else {
            const delRes = await Home.deleteOne({_id: existingHome._id});
            return await new Home({...homeData}).save();
        }
    }
    catch (err) {
        console.log(err)
        throw err;
    }
}

module.exports= {
    postHomeData,
    getHomeData
}