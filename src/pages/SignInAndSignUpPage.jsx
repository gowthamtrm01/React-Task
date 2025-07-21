import { useState } from "react";
import lemonIcon from './../assets/lemon-pay.png';
import SignInForm from '../components/SignForm';
import SignUpForm from '../components/SignUpForm';

export default function SignInAndSignUpPage (){
    const [signInForm, setSignInForm] = useState(true)
    return <>
    <div className="loginbg w-full" >
        <div>
            <img src={lemonIcon} className='w-50 h-20' alt="Icon" />
            <div className="ml-5 mt-80">
                <h1 className="text-white text-4xl font-nunito">Join 1000 Businesses</h1>
                <h1 className="text-yellow-200 text-4xl font-nunito">Powering Growth with</h1>
                <h1 className="text-white text-4xl font-nunito">Lemonpay!</h1>
            </div>
        </div>
        <div className="flex flex-col mt-2 mr-12 justify-center">
            {signInForm ? (<SignInForm setSignInForm={setSignInForm} />) : (<SignUpForm setSignInForm={setSignInForm} />)}
        </div>
    </div>
    </>
}