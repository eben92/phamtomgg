import { Schema, model, models } from 'mongoose';
import { compare, genSalt, hash } from 'bcrypt';
import isEmail from 'validator/lib/isEmail';
import isStrongPassword from 'validator/lib/isStrongPassword';

const adminSchema = new Schema(
  {
    email: {
      type: String,
      default: '',
      required: true,
      unique: true
    },
    name_of_institution: {
      type: String,
      default: '',
      required: true,
      unique: true
    },
    address: {
      type: String,
      default: ''
    },
    phone_number: {
      type: String,
      default: '',
      required: true,
      unique: true
    },
    password: {
      type: String,
      default: '',
      required: true
    },
    registration_number: {
      type: String,
      default: '',
      required: true,
      unique: true
    }
  },
  { timestamps: true }
);

// sign in method
adminSchema.statics.signin = async function (body: any) {
  const { password, email } = body;

  if (!email || !password) {
    throw Error('Missing email or password');
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw Error('Incorrect email');
  }

  const passwordMatch = await compare(password, user.password);

  if (!passwordMatch) throw Error('Incorrect password');

  const userBodyWithoutPassword = await this.findOne({
    email
  }).select('-password');
  return userBodyWithoutPassword;
};

// sign up method
adminSchema.statics.signup = async function (body: any) {
  const { password, name_of_institution, email } = body;

  if (!name_of_institution || !password || !email) {
    throw Error('All fields must be filled ');
  }

  const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

  if (format.test(name_of_institution)) {
    throw Error('Name of institution cannot contain special characters');
  }

  if (name_of_institution.lenth < 3) {
    throw Error('Name of institution should be 3 or more character');
  }

  if (!isEmail(email)) {
    throw Error('Invalid Email');
  }
  if (password.length < 6) {
    throw Error('Password should be 6 or more character');
  }
  // if (!isStrongPassword(password)) {
  //   throw Error('Password not strong enough');
  // }

  const findUserWithSameEmail = await this.findOne({ email });

  if (findUserWithSameEmail) {
    throw Error('Email already in use');
  }

  const findUserWithSameUsername = await this.findOne({ name_of_institution });

  if (findUserWithSameUsername) {
    throw Error('Name of institution already in use');
  }

  const salt = await genSalt(10);
  const hashPassword = await hash(password, salt);

  await this.create({ email, password: hashPassword, name_of_institution });
  const userWithoutPassword = await this.findOne({ email }).select('-password');
  return userWithoutPassword;
};

const Admin: any = (module.exports =
  models.Admin || model('Admin', adminSchema));
export default Admin;
