const mongoose = require('mongoose');
const { Schema } = mongoose;

const studentSchema = new Schema({
  code: { 
    type: String, 
    required: true, 
    unique: true 
},
  semester: { 
    type: Schema.Types.ObjectId, 
    ref: 'Semester' 
}
},
{
  timestamps : true,
}
);

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
