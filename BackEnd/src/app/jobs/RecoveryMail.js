import Mail from '../../lib/Mail';

class RecoveryMail {
  get key() {
    return 'Reset_password';
  }

  async handle({ data }) {
    const { name, email, password_reset_token } = data;

    console.log('e-mail de recupeção enviado');

    await Mail.sendMail({
      to: `${name} <${email}>`,
      subject: 'Recuperação de senha Contify',
      template: 'reset_password',
      context: {
        name,
        password_reset_token,
      },
    });
  }
}

export default new RecoveryMail();
