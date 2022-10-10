import Image from 'next/image';
import Link from 'next/link';
const Footer = () => {
  return (
    <div className='footer_container'>
      <div className='left_items'>
        <div className='logo'>
          <Image src='/assets/navbar/logo.svg' width={'152.67'} height={'40'} />
        </div>

        <div className='copyright'>
          <p>Copyright. 2022 </p>

          <div className=''>
            <Link href='/terms-of-services'>
              <a>
                <p>Terms of Services</p>
              </a>
            </Link>
            <Link href='/privacy-policy'>
              <a>
                <p>Privacy Policy</p>
              </a>
            </Link>
          </div>
        </div>
      </div>

      <div className='right_items'>
        <div className='contacts_container'>
          {/* Phone */}
          <div>
            <h5>Phone: </h5>
            <p> +234 7025550596</p>
          </div>

          {/* Office */}
          <div>
            <h5>Office: </h5>
            <p> 5B, Quivers Court, Ajah, Lagos State, Nigeria</p>
          </div>

          {/* email */}
          <div className='email'>
            <Image src={'/assets/footer/email.svg'} height={16} width={20} />
            <div>
              <p>phamtom@phamtomhealth.com</p>
              <p>phamtom.inc@gmail.com</p>
            </div>
          </div>

          {/* socials */}
          <div className='socials'>
            <Link href={'https://www.instagram.com/phamtom.inc?r=nametag'}>
              <a className='instagram' target='_blank'>
                <Image
                  src={'/assets/footer/instagram.svg'}
                  height={18}
                  width={18}
                />
              </a>
            </Link>
            <Link href={'https://www.linkedin.com/company/phamtom-health/'}>
              <a target='_blank'>
                <Image
                  src={'/assets/footer/linkdn.svg'}
                  height={18}
                  width={18}
                />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
