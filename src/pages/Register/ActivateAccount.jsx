import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { activateAccountAction } from '../../redux/actions/auth';
import Swal from 'sweetalert2';

export default function ActivateAccount() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authRegister = useSelector((state) => state.authRegister);
  const [otp, setOtp] = useState();

  const onChange = (e) => {
    setOtp(e);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (otp === '') {
      return Swal.fire({
        title: 'Failed!',
        text: `Code OTP is required`,
        icon: 'error',
      });
    }

    Swal.fire({
      title: 'Activating your account...',
      html: 'Please wait...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    dispatch(activateAccountAction(authRegister.data.uuid, otp, navigate));
  };

  return (
    <div>
      <div className='container-fluid edit-profile ff-poppins px-0'>
        <div className='container d-flex justify-content-center align-items-center'>
          <form onSubmit={(e) => onSubmit(e)}>
            <h4 className='text-center color-primary fw-semibold mt-5 pt-5 mb-5'>Insert Code OTP to activate your account</h4>
            <div className='mb-3 name mx-auto'>
              <label className='form-label'>Code OTP</label>
              <input type='text' name='otp' className='form-control old-password' id='old-password' placeholder='Your Code OTP' onChange={(e) => onChange(e.target.value)} />
            </div>
            <div className='mb-3 change-password mx-auto'>
              <button type='submit' className='btn btn-update-profile background-primary text-white'>
                Activate Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
