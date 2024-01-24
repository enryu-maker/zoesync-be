import express, { Request, Response } from 'express';
import Patient from '../Model/Patient';
import Bed from '../Model/Bed';
import Room from '../Model/Room';
import request from 'request';
const api = express();

api.get('/auth', (req: Request, res: Response) => {
    try {
        request.get(`http://169.254.2.184:5000/read`, async function (error, response, body) {
            if (!error && response.statusCode === 200) {
                const body = JSON.parse(response.body);
                res.status(200).json(body);
            }
            else {
                res.status(400).json({ message: "error" });
            }
        });
    }
    catch (err) {
        res.json({ message: "Something Went Wrong" });
    }
});

api.post('/getcleaning', async (req: Request, res: Response) => {
    const data: any = req.body;
    const room = await Room.findOne({ room_number: data.room_number })
    if (room) {
        res.status(200).json({
            room: room,
        });
    }
    else {
        res.status(400).json({ msg: "Room Doesn't Exist" });
    }
});

api.post('/updatecleaning', async (req: Request, res: Response) => {
    const data: any = req.body;
    const room = await Room.findOne({ room_number: data.room_number })
    if (room) {
        room.clean = data.status
        await room.save()
        res.status(200).json({
            msg: "Room cleaned Successfully ",
        });
    }
    else {
        res.status(400).json({ msg: "Room Doesn't Exist" });
    }
});

api.post('/patient', async (req: Request, res: Response) => {
    const patient: any = req.body;
    const newPatient = new Patient({
        id: patient.id,
        firstname: patient.firstname,
        lastname: patient.lastname,
        date_of_birth: patient.date_of_birth,
        gender: patient.gender,
        contact_number: patient.contact_number,
        emergency_contact: patient.emergency_contact,
        admission_date: patient.admission_date,
        attending_physician: patient.attending_physician,
        attending_nurse: patient.attending_nurse
    })
    const patientExist = await Patient.findOne({ productid: patient.id });
    if (patientExist) {
        res.status(400).json({ msg: "Patient Already Exist" });
    }
    else {
        const patient = await newPatient.save();
        res.status(200).json({
            msg: "Patient Added Successfully",
            patient: patient
        });
    }
});

api.post('/addbed', async (req: Request, res: Response) => {
    const bed: any = req.body;
    const patient: any = await Patient.findOne({
        id: bed?.id
    })
    const newBed = new Bed({
        room_number: bed.room_number,
        bed_number: bed.bed_number,
        status: bed.status,
        patient: patient ? patient : {},
        admission_date: bed.admission_date
    })
    if (!patient) {
        res.status(400).json({ msg: "Patient Does't Exist" });
    }
    else {
        const bed = await newBed.save();
        res.status(200).json({
            msg: "Bed Added Successfully",
            bed: bed
        });
    }

});


api.post('/addbedpatient', async (req: Request, res: Response) => {
    const data: any = req.body;
    const patient: any = await Patient.findOne({
        id: data?.patient_id
    })
    const bed: any = await Bed.findOne({
        bed_number: data?.bed_number
    })
    if (bed) {
        if (patient) {
            bed.patient = patient
            await bed.save();
            res.status(201).json({
                msg: "Bed Updated Successfully",
            });
        }
        else {
            res.status(404).json({
                msg: "Patient Doesn't Exit",
            });
        }
    }
    else {
        res.status(404).json({
            msg: "Bed Doesn't Exit",
        });
    }

});

api.get('/getroom', async (req: Request, res: Response) => {
    const data = await Bed.find()
    res.status(200).json({
        data: data,
    });

})

api.post('/postroom', async (req: Request, res: Response) => {
    const data: any = req.body;
    const bed = await Bed.find({room_number : data?.room_number})
    const newRoom = new Room({
        room_number: data?.room_number,
        bed: bed,
        clean: false
    })
    await newRoom.save();
    res.status(201).json({
        msg: "Room Updated Successfully",
    });


})
export default api;