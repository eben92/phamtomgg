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

const Admin: any = (module.exports =
  models.Admin || model('Admin', adminSchema));
export default Admin;
