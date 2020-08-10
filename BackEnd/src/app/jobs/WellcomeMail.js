import Mail from '../../lib/Mail';

class WellcomeMail {
  get key() {
    return 'WellcomeMail';
  }

  async handle({ data }) {
    const { name, email } = data;

    console.log('e-mail de boas vindas enviado');

    await Mail.sendMail({
      to: `${name} <${email}>`,
      subject: 'Seja bem vindo ao Contify',
      template: 'wellcome',
      context: {
        name,
      },
    });
  }
}

export default new WellcomeMail();
