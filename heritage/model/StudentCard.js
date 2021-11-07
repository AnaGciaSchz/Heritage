const mongoose = require("mongoose");

const StudentCardSchema = new mongoose.Schema({
    id:{
        type: String,
        required: [true, "Añade un id"],
        unique: true
    },
    name:{
        type: String,
        required: [true, 'Añade un nombre'],
        unique: false,
        maxLength: [29, "No se pueden añadir más caracteres, Máximo: 29"]
    },
    registry:{
        type: Date,
        required: [true, 'Añade la fecha de registro'],
        unique: false
    },
    image:{
        type: Buffer,
        contentType: String,
        required: false,
        unique: false
    },
    promotion:{
        type: String,
        required: [true, 'Añade la fecha de registro'],
        unique: false
    },
    shortDescription:{
        type: String,
        required: [true, 'Añade una descripción costa'],
        unique: false,
        maxLength: [150, "No se pueden añadir más caracteres, Máximo: 150"]
    },
    longDescription:{
        type: String,
        required: [true, 'Añade una descripción larga'],
        unique: false,
        maxLength: [230, "No se pueden añadir más caracteres, Máximo: 230"]
    },
    professionalArchievements:{
        type: String,
        required: [true, 'Añade logros profesionales'],
        unique: false,
        maxLength: [230, "No se pueden añadir más caracteres, Máximo: 230"]
    },
    Red1:{
        type: String,
        required: false,
        unique: false
    },
    Red2:{
        type: String,
        required: false,
        unique: false
    },
    Red3:{
        type: String,
        required: false,
        unique: false
    },
    Red1Link:{
        type: String,
        required: false,
        unique: false
    },
    Red2Link:{
        type: String,
        required: false,
        unique: false
    },
    Red3Link:{
        type: String,
        required: false,
        unique: false
    },
    AppearsInAnotherCategory:{
        type: Boolean,
        required: true,
        unique: false
    }
})

module.exports = mongoose.models.StudentCard || 
mongoose.model('StudentCard',StudentCardSchema);