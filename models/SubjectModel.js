const mongoose = require('mongoose');
const { Schema } = mongoose;

const subjectSchema = new Schema({
  name: { 
    type: String, 
    required: true 
  },
  semester: { 
    type: Schema.Types.ObjectId, 
    ref: 'Semester', 
    required: true 
  },
  chapters: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'Chapter' 
  }]
},
{
  timestamps :true,
}
);

const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject;
