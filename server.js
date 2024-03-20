const express = require('express')
const mongoose = require('mongoose')
const Subject = require('./models/SubjectModel')
// const Student = require('./models/StudentModel')
const Semester = require('./models/SemesterModel')
const Chapter = require('./models/ChapterModel')
const Signup = require('./models/SignupModel')
const bcrypt = require('bcrypt')

const app = express()


app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//routes
app.get('/',(req,res)=>{
    res.send('Hello Node API')
})

// Signup route with password hashing
app.post('/signup', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.Password, 10); 
    const newUser = await Signup.create({
      Firstname: req.body.Firstname,
      Lastname: req.body.Lastname,
      Email: req.body.Email,
      Password: hashedPassword,
    });
    res.status(200).json(newUser);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Error creating user' });
  }
});

// Login route
app.post('/login', async (req, res) => {
  try {
    const user = await Signup.findOne({ Email: req.body.Email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    const isMatch = await bcrypt.compare(req.body.Password, user.Password);
    if (isMatch) {
      return res.status(200).json({ message: 'Login successful' });
    } else {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Error:', error.status);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

//create semester,subjects and chapters
app.post('/add-data', async (req, res) => {
  try {
    // Create 4 semesters
    const semesters = await Semester.insertMany([
      { name: 'Semester 1' },
      { name: 'Semester 2' },
      { name: 'Semester 3' },
      { name: 'Semester 4' },
    ]);

    // Create subjects for each semester
    const subjects = [];
    for (let i = 0; i < semesters.length; i++) {
      const semesterId = semesters[i]._id;
      for (let j = 1; j <= 4; j++) {
        const subject = new Subject({
          name: `Subject ${j} for Semester ${i + 1}`,
          semester: semesterId,
        });
        subjects.push(subject);
      }
    }
    await Subject.insertMany(subjects);

    // Create chapters for each subject
    const chapters = [];
    for (let subject of subjects) {
      for (let k = 1; k <= 5; k++) {
        const chapter = new Chapter({
          name: `Chapter ${k} for ${subject.name}`,
          content: `Content for Chapter ${k}`,
          subject: subject._id,
        });
        chapters.push(chapter);
      }
    }
    await Chapter.insertMany(chapters);

    return res.json({ message: 'Data added successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});


// //choose semester
// app.put('/students/:code/choose-semester/:semesterId', async (req, res) => {
//   // const { code, semesterId } = req.params;
//   const { semesterId } = req.params;

//   try {
//     const semester = await Semester.findById(semesterId);

//     if (!semester) {
//       return res.status(404).json({ error: 'Semester not found' });
//     }

//     // const student = await Student.findOneAndUpdate(
//     //   { code: code },
//     //   { semester: semesterId },
//     //   { new: true }
//     // );

//     // if (!student) {
//     //   return res.status(404).json({ error: 'Student not found' });
//     // }

//     return res.json({ message: 'Semester chosen successfully', student });
//   } catch (error) {
//     return res.status(500).json({ error: 'Internal server error' });
//   }
// });

//find subjects
app.get('/subjects/:semesterId', async (req, res) => {
  const { semesterId } = req.params;

  try {
    const subjects = await Subject.find({ semester: semesterId });
    console.log('Retrieved subjects:', subjects); 
    return res.json({ subjects });
  } catch (error) {
    console.log("error:",error)
    return res.status(500).json({ error: 'Internal server error' });
  }
});

//find chapters
app.get('/chapters/:subjectId', async (req, res) => {
  const { subjectId } = req.params;

  try {
    const chapters = await Chapter.find({ subject: subjectId });
    console.log("Reterived Chapters:",chapters)
    return res.json({ chapters });
  } catch (error) {
    console.log("error:",error)
    return res.status(500).json({ error: 'Internal server error' });
  }
});

//
app.get('/chapters/:chapterId/content', async (req, res) => {
  const { chapterId } = req.params;

  try {
    const chapter = await Chapter.findById(chapterId);

    if (!chapter) {
      return res.status(404).json({ error: 'Chapter not found' });
    }

    return res.json({ content: chapter.content });
  } catch (error) {
    console.log("error:",error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// //choose semester and get subjects
// app.get('/semester/:semesterId/subjects', async (req, res) => {
//   const { semesterId } = req.params;

//   try {
//     const semester = await Semester.findById(semesterId);

//     if (!semester) {
//       return res.status(404).json({ error: 'Semester not found' });
//     }

//     const subjects = await Subject.find({ semester: semesterId });

//     return res.json({ semester, subjects });
//   } catch (error) {
//     return res.status(500).json({ error: 'Internal server error' });
//   }
// });

mongoose.set("strictQuery",false)
mongoose.connect('mongodb+srv://sahanasakri123:Sahana123@studentapi.zioio2c.mongodb.net/Nodejs-API?retryWrites=true&w=majority&appName=StudentAPI').then(() =>{
    app.listen(3000, ()=>{
        console.log('Node API app is running on port 3000')
    })
    console.log('connected to MongoDB')
}).catch((error)=>{
  console.log(error)
})

//hello