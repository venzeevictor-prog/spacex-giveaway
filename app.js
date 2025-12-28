

import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors'
import { fileURLToPath } from 'url';


const pss = dotenv.configDotenv({ path: '', encoding: 'latin1', quiet: false, debug: true, override: false })

const app = express();
const PORT = process.env.PORT || 3350;


app.use(express.json());
// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.json());

app.use(cors({
  origin: "null", // Or '*' for all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'credentials'] // Allowed headers
}));

app.use(express.static(path.join(path.basename(''), 'www')));
const router = express.Router()
app.use('',router)

// Default route
app.get('', (req, res) => {
    
  res.sendFile(path.join(__dirname, 'www', 'index.html')); 
 
});
let pageViews = [];
router.post("/track-view", async (req, res) => {
  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.socket.remoteAddress;

  let location = {};

  try {
const response = await fetch(`https://ipwho.is/${ip}`);



    location = await response.json();
    console.log(location)
  } catch (error) {
    location = { error: "Location lookup failed" };
    console.log(location)
  }

  const viewData = {
    time: new Date(),
    ip,
    country: location.country_name,
    city: location.city,
  };

  pageViews.push(viewData);
  console.log(viewData);

  res.sendStatus(200);
});

router.get('/reward', (req, res) => {
    
    res.sendFile(path.join(__dirname, 'www', 'reward.html'));
    
});

router.post('/reward/reviews', (req, res) => {
  const ipaddress =  req.body.ipaddress
  
  const initial_data = [
    
    {
      address : '3Et13WwN4D8HHTLSPn56rhGf3aMrk6aZSF',
      content_source: 'I deposited 1 BTC, and my account reflected 5 BTC within 12 minutes. The process was smooth and efficient.',
      Image_src_url :'/asset/img/'
    },
    
      
    {
      address : '3G7jcEELKh38L6kaSV8K35pTqsh5bgZW2D   ',
      content_source: 'Everything went through smoothly, which made the experience enjoyable.',
      Image_src_url :'/asset/img/'
    },
    
      
    {
      address : 'bc1qxcn9965xwztdh965cp06279q5ne0zz6t27vgs0',
      content_source: 'The giveaway experience was better than expected, with no complications.',
      Image_src_url :'/asset/img/'
    },
    
      
    {
      address : 'bc1qcqveykpxevkhvxg0742xwys8g9hvqzs7hjf2ek',
      content_source: 'I wasn’t sure what to expect, but the process turned out to be smooth and easy. thank you Elon Musk.',
      Image_src_url :'/asset/img/'
    },
    
      
    {
      address : 'bc1q57ka7dmd2ljcst3l2xtgctz5ctszdegtvnyaxc',
      content_source: 'A clean and straightforward experience giveaway im really impressed. thank you Elon Musk.',
      Image_src_url :'/asset/img/'
    },
    
      
    {
      address : '3Et13WwN4D8HHTLSPn56rhGf3aMrk6aZSF',
      content_source: 'Easy to use and well-organized giveaway.',
      Image_src_url :'/asset/img/'
    },
    
      
    {
      address : '35BpUGMm4Cod9dVWwdTJK1A4RDsCE3zTVC',
      content_source: 'Overall, the experience was straightforward and easy to complete',
      Image_src_url :'/asset/img/'
    },
    
      
    {
      address : '3G7jcEELKh38L6kaSV8K35pTqsh5bgZW2D',
      content_source: 'The platform was responsive and easy to use, making the process hassle-free.',
      Image_src_url :'/asset/img/'
    },
    
      
    {
      address : 'bc1q57ka7dmd2ljcst3l2xtgctz5ctszdegtvnyaxc',
      content_source: 'I appreciated how smooth and organized the entire experience was.',
      Image_src_url :'/asset/img/'
    },
    
      
    {
      address : '18uhzy546Qz7CxRNkHohg4W9VSkfTkbSvY',
      content_source: ' I had a positive experience using the platform. Everything was handled promptly and smoothly.',
      Image_src_url :'/asset/img/'
    },
    
      
    {
      address : 'bc1q57ka7dmd2ljcst3l2xtgctz5ctszdegtvnyaxc',
      content_source: 'The setup was simple, and the process went through faster than I expected.',
      Image_src_url :'/asset/img/'
    },
    
      
    {
      address : 'bc1qmdwdtm4uf76qauwlxxkjxhzt827phx3ktz75pm',
      content_source: 'I deposited 1 BTC, and my account reflected 5 BTC within 12 minutes. The process was smooth and efficient.',
      Image_src_url :'/asset/img/'
    },
    
      
    {
      address : '3Et13WwN4D8HHTLSPn56rhGf3aMrk6aZSF',
      content_source: 'I deposited 1 BTC, and my account reflected 5 BTC within 12 minutes. The process was smooth and efficient.',
      Image_src_url :'/asset/img/'
    },
    
      
    {
      address : '3Et13WwN4D8HHTLSPn56rhGf3aMrk6aZSF',
      content_source: 'I deposited 1 BTC, and my account reflected 5 BTC within 12 minutes. The process was smooth and efficient.',
      Image_src_url :'/asset/img/'
    },
    
      
    {
      address : '3Et13WwN4D8HHTLSPn56rhGf3aMrk6aZSF',
      content_source: 'I deposited 1 BTC, and my account reflected 5 BTC within 12 minutes. The process was smooth and efficient.',
      Image_src_url :'/asset/img/'
    },
    
      
    {
      address : '3Et13WwN4D8HHTLSPn56rhGf3aMrk6aZSF',
      content_source: 'I deposited 1 BTC, and my account reflected 5 BTC within 12 minutes. The process was smooth and efficient.',
      Image_src_url :'/asset/img/'
    },
    
      
    {
      address : '3Et13WwN4D8HHTLSPn56rhGf3aMrk6aZSF',
      content_source: 'I deposited 1 BTC, and my account reflected 5 BTC within 12 minutes. The process was smooth and efficient.',
      Image_src_url :'/asset/img/'
    },
    
      
    {
      address : '3Et13WwN4D8HHTLSPn56rhGf3aMrk6aZSF',
      content_source: 'I deposited 1 BTC, and my account reflected 5 BTC within 12 minutes. The process was smooth and efficient.',
      Image_src_url :'/asset/img/'
    },
    
      
    {
      address : '3Et13WwN4D8HHTLSPn56rhGf3aMrk6aZSF',
      content_source: 'I deposited 1 BTC, and my account reflected 5 BTC within 12 minutes. The process was smooth and efficient.',
      Image_src_url :'/asset/img/'
    },
    
      
    {
      address : '3Et13WwN4D8HHTLSPn56rhGf3aMrk6aZSF',
      content_source: 'I deposited 1 BTC, and my account reflected 5 BTC within 12 minutes. The process was smooth and efficient.',
      Image_src_url :'/asset/img/'
    },
    
      
    {
      address : '3Et13WwN4D8HHTLSPn56rhGf3aMrk6aZSF',
      content_source: 'I deposited 1 BTC, and my account reflected 5 BTC within 12 minutes. The process was smooth and efficient.',
      Image_src_url :'/asset/img/'
    },
    
      
    {
      address : '3Et13WwN4D8HHTLSPn56rhGf3aMrk6aZSF',
      content_source: 'I deposited 1 BTC, and my account reflected 5 BTC within 12 minutes. The process was smooth and efficient.',
      Image_src_url :'/asset/img/'
    },
    
      
    {
      address : '3Et13WwN4D8HHTLSPn56rhGf3aMrk6aZSF',
      content_source: 'I deposited 1 BTC, and my account reflected 5 BTC within 12 minutes. The process was smooth and efficient.',
      Image_src_url :'/asset/img/'
    },
    
      
    {
      address : '3Et13WwN4D8HHTLSPn56rhGf3aMrk6aZSF',
      content_source: 'I deposited 1 BTC, and my account reflected 5 BTC within 12 minutes. The process was smooth and efficient.',
      Image_src_url :'/asset/img/'
    },
    
      
    {
      address : '3Et13WwN4D8HHTLSPn56rhGf3aMrk6aZSF',
      content_source: 'I deposited 1 BTC, and my account reflected 5 BTC within 12 minutes. The process was smooth and efficient.',
      Image_src_url :'/asset/img/'
    },
    
      
    {
      address : '3Et13WwN4D8HHTLSPn56rhGf3aMrk6aZSF',
      content_source: 'I deposited 1 BTC, and my account reflected 5 BTC within 12 minutes. The process was smooth and efficient.',
      Image_src_url :'/asset/img/'
    },
    
      
    {
      address : '3Et13WwN4D8HHTLSPn56rhGf3aMrk6aZSF',
      content_source: 'I deposited 1 BTC, and my account reflected 5 BTC within 12 minutes. The process was smooth and efficient.',
      Image_src_url :'/asset/img/'
    },
    
      
    {
      address : '3Et13WwN4D8HHTLSPn56rhGf3aMrk6aZSF',
      content_source: 'I deposited 1 BTC, and my account reflected 5 BTC within 12 minutes. The process was smooth and efficient.',
      Image_src_url :'/asset/img/'
    },
    
      
    {
      address : '3Et13WwN4D8HHTLSPn56rhGf3aMrk6aZSF',
      content_source: 'I deposited 1 BTC, and my account reflected 5 BTC within 12 minutes. The process was smooth and efficient.',
      Image_src_url :'/asset/img/'
    },
    
      
    {
      address : '3Et13WwN4D8HHTLSPn56rhGf3aMrk6aZSF',
      content_source: 'I deposited 1 BTC, and my account reflected 5 BTC within 12 minutes. The process was smooth and efficient.',
      Image_src_url :'/asset/img/'
    },
    
  
  ]
  res.json({initial_data_list : initial_data})

});







app.use(express.static(path.join(path.dirname('public'))));

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
