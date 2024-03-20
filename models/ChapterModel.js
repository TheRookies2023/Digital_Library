const mongoose = require('mongoose');
const { Schema } = mongoose;

const chapterSchema = new Schema({
  name: { 
    type: String, 
    required: true 
},
  content: { 
    type: String, 
    required: true 
},
  subject: { 
    type: Schema.Types.ObjectId, 
    ref: 'Subject', 
    required: true
 }
},
{
 timestamps : true,
}
);

const Chapter = mongoose.model('Chapter', chapterSchema);

module.exports = Chapter;
