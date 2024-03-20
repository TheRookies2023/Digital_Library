const mongoose = require('mongoose');
const { Schema } = mongoose;

const semesterSchema = new Schema({
  name: { type: String, 
          required: true 
        },
  subjects: [{
     type: Schema.Types.ObjectId,
      ref: 'Subject' 
    }],
},
{
    timestamps: true
  }
);

const Semester = mongoose.model('Semester', semesterSchema);

module.exports = Semester;
