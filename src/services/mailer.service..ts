interface EmailParams {
  from: string;
  to: string | string[];
  subject: string;
  text: string;
}

const sendMail = async (data: EmailParams) => {
  try {
  } catch (error) {}
};

class MailerService {
  constructor(private emailClient, private emailDomain) {}
}
