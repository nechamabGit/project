const ReportToDeliver = require("../models/ReportToDeliver");

const createNewReportToDeliver = async (req, res) => {
    const {idMachine,countFilling,complete,message} = req.body
    if (!idMachine || !countFilling ) { // Confirm data
    return res.status(400).json({ message: 'all is required' })}
    // Create and store the new ReportToDeliver  = await ReportToDeliver.create({idMachine,countFilling,complete,message
    const ReportToDeliverRes = await ReportToDeliver.create({idMachine,countFilling,complete,message
    })
    
    if (ReportToDeliverRes){
    return res.status(201).json({ message: 'New ReportToDeliver created' })
    } else {
    return res.status(400).json({ message: 'Invalid ReportToDeliver ' })}}
    
    //get
    const getAllReportToDeliver = async (req, res) => {
        // Get all ReportToDelivers from MongoDB
        const ReportToDelivers = await ReportToDeliver.find().lean()
        // If no ReportToDelivers
        if (!ReportToDelivers?.length) {
        return res.status(400).json({ message: 'No ReportToDelivers found' })
        }
        res.json(ReportToDelivers)
        }

//update
        const updateReportToDeliver = async (req, res) => {
            const {_id,idMachine,countFilling,complete,message}= req.body
            // Confirm data
            if (!_id || !idMachine || !countFilling  ) {
            return res.status(400).json({ message: 'fields are required' })
            }
            // Confirm ReportToDeliver exists to update
            const ReportToDeliver = await ReportToDeliver.findById(_id).exec()
            if (!ReportToDeliver) {
            return res.status(400).json({ message: 'ReportToDeliver not found' })
            }
            ReportToDeliver.idMachine = idMachine
            ReportToDeliver.countFilling = countFilling
            ReportToDeliver.complete = complete
            ReportToDeliver.message = message
            const updateReportToDeliver = await ReportToDeliver.save()
            res.json(`'${updateReportToDeliver._id}' updated`)
            }

            //delete
            const deleteReportToDeliver = async (req, res) => {
                const {_id} = req.body
                // Confirm ReportToDeliver exists to delete
                const ReportToDeliver = await ReportToDeliver.findById(_id).exec()
                if (!ReportToDeliver) {
                return res.status(400).json({ message: 'ReportToDeliver not found' })
                }
                const result = await ReportToDeliver.deleteOne()
                const reply=`ID ${result._id} deleted`
                res.json(reply)
                }
        
    
    //getbyid
    const getReportToDeliverById = async (req, res) => {
        console.log("yyyyyy");
        
        // החילוץ של ה-ID מתוך ה-USER
        const _id = req.user._id;  // ככה את שולפת את ה-ID מתוך ה-Payload
      
        // אם את רוצה לוודא שה-USER קיים, את יכולה להוסיף בדיקה
        if (!req.user || !req.user._id) {
          return res.status(400).json({ message: 'User ID is missing' });
        }
      
        // קבלת הדו"ח על פי ה-ID
        const ReportToDeliver = await ReportToDeliver.findById(_id).lean();
      
        // אם לא נמצא דו"ח
        if (!ReportToDeliver) {
          return res.status(400).json({ message: 'No ReportToDeliver found' });
        }
      
        res.json(ReportToDeliver);
      }
                     
                    module.exports = {
                        getAllReportToDeliver,
                        createNewReportToDeliver,
                        getReportToDeliverById,
                        updateReportToDeliver,   
                        deleteReportToDeliver
                        }