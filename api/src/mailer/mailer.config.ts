// mailer.config.ts





// export default {
//   host: "smt.gmail.com",
//   port: 465,
//   secure:true,
//   auth: {
//     user: "afd8ce4336fdf7",
//     pass: "6c14da3ece110a",
//   }
// };


export default {
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
    name: process.env.SMTP_NAME
   }
  };
  


//  export default {
//   host: process.env.SMTP_HOST,
//   port: parseInt(process.env.SMTP_PORT),
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASS,
//     name: process.env.SMTP_NAME
//    }
//   };
  